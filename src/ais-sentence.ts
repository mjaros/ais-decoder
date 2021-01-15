import {DecodingError} from './errors';

class AisSentence {
  message: string;
  talkerId: string;
  type: string;
  numParts: number;
  partNumber: number;
  partId: number;
  channel: string;
  payload: string;
  fillBits: number;
  checksum: string;

  // eslint-disable-next-line max-statements
  constructor(message: string) {
    const startIndex = message.indexOf('!');

    if (startIndex === -1) {
      throw new DecodingError('Start not found', this);
    }

    this.message = message;

    const messageFields = this.message.split(',');
    if (messageFields.length !== 7) {
      throw new DecodingError('Invalid length', this);
    }

    const suffix = messageFields[6].split('*');
    if (suffix.length !== 2) {
      throw new DecodingError('Invalid suffix', this);
    }

    this.talkerId = messageFields[0].substr(1, 2);
    this.type = messageFields[0].substr(3, 5);
    this.numParts = Number(messageFields[1]);
    this.partNumber = Number(messageFields[2]);
    this.partId = Number(messageFields[3]);
    this.channel = messageFields[4];
    this.payload = messageFields[5];
    this.fillBits = Number(suffix[0]);
    this.checksum = suffix[1];

    this.checkChecksum();
  }

  isMultiPart(): boolean {
    return this.numParts > 1;
  }

  isLastPart(): boolean {
    return this.numParts === this.partNumber;
  }

  checkChecksum(): void {
    const checksumString = this.message
      .split('*')[0]
      .substr(1, this.message.length);
    let checksum = 0;

    for (let i = 0; i < checksumString.length; i++) {
      // eslint-disable-next-line no-bitwise
      checksum = checksum ^ checksumString.charCodeAt(i);
    }

    const checksumHex = checksum.toString(16).toUpperCase();

    if (checksumHex !== this.checksum) {
      throw new DecodingError('Invalid checksum', this);
    }
  }
}

export default AisSentence;
