import {Transform, TransformOptions} from 'stream';

import AisSentence from './ais-sentence';
import AisBitField from './ais-bitfield';
import AisMessage from './messages/ais-message';
import AisMessage123 from './messages/ais-message-123';
import AisMessage4 from './messages/ais-message-4';
import AisMessage5 from './messages/ais-message-5';
import {DecodingError} from './errors';

interface AisDecoderOptions {
  silent?: boolean;
}

const defaultOptions: AisDecoderOptions = {
  silent: false
};

class AisDecoder extends Transform {
  options: AisDecoderOptions;
  multiPartBuffer: Array<AisSentence> = [];

  constructor(
    options?: AisDecoderOptions,
    transformOptions?: TransformOptions
  ) {
    super(transformOptions);
    this.options = {...defaultOptions, ...options};
    this.setEncoding('utf8');
  }

  _transform(
    chunk: Buffer,
    encoding: string,
    callback: (error?: Error) => void
  ): void {
    try {
      const message = chunk.toString(this.readableEncoding);
      const sentence = new AisSentence(message);

      if (sentence.isMultiPart()) {
        this.handleMultiPartSentence(sentence);
      } else {
        this.decodePayload(sentence.payload);
      }

      return callback();
    } catch (err) {
      if (err instanceof DecodingError && this.options.silent) {
        return callback();
      }

      return callback(err);
    }
  }

  handleMultiPartSentence(sentence: AisSentence): void {
    this.multiPartBuffer.push(sentence);

    if (sentence.isLastPart()) {
      const payloads = this.multiPartBuffer.map(
        multiPartSentence => multiPartSentence.payload
      );
      this.decodePayload(payloads.join(''));
    }
  }

  decodePayload(payload: string): void {
    const bitField = new AisBitField(payload);
    const messageType = bitField.getInt(0, 6);

    let decodedMessage: AisMessage = null;

    switch (messageType) {
      case 1:
      case 2:
      case 3:
        decodedMessage = new AisMessage123(messageType, bitField);
        break;
      case 4:
        decodedMessage = new AisMessage4(messageType, bitField);
        break;
      case 5:
        decodedMessage = new AisMessage5(messageType, bitField);
        break;
    }

    if (decodedMessage) {
      this.push(JSON.stringify(decodedMessage));
    }
  }
}

export default AisDecoder;