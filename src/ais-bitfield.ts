const sixBitAsciiChars =
  '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_ !"#$%&\'()*+,-./0123456789:;<=>?';

class AisBitField {
  payload: string;
  binaryPayload: string;

  constructor(payload: string) {
    this.payload = payload;
    this.binaryPayload = '';

    for (let i = 0; i < this.payload.length; i++) {
      let asciiValue = this.payload.charCodeAt(i) - 48;

      if (asciiValue > 40) {
        asciiValue -= 8;
      }

      const binaryValue = asciiValue.toString(2);
      this.binaryPayload += `000000${binaryValue}`.slice(-6);
    }
  }

  getInt(startIndex: number, length: number): number {
    const binary = this.binaryPayload.substr(startIndex, length);
    return parseInt(binary, 2);
  }

  getSignedInt(startIndex: number, length: number): number {
    let int = this.getInt(startIndex, length);

    // Convert to signed integer
    // eslint-disable-next-line no-bitwise
    if ((int & (1 << (length - 1))) !== 0) {
      // eslint-disable-next-line no-bitwise
      int -= 1 << length;
    }

    return int;
  }

  getBoolean(startIndex: number, length: number): boolean {
    return Boolean(this.getInt(startIndex, length));
  }

  getString(startIndex: number, length: number): string {
    let stringValue = '';

    const chunkLength = 6;
    const binary = this.binaryPayload.substr(startIndex, length);
    const numChunks = Math.floor(length / chunkLength);

    // We need to split the binary payload into chunks of 6 bits and
    // map each chunk to its ASCII representation
    for (let i = 0, o = 0; i < numChunks; i++, o += chunkLength) {
      const binaryChunk = binary.substr(o, chunkLength);
      const position = parseInt(binaryChunk, 2);
      const char = sixBitAsciiChars.charAt(position);
      stringValue += char;
    }

    return stringValue.trimRight();
  }
}

export default AisBitField;
