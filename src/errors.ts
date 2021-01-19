export class DecodingError extends Error {
  constructor(message: string, sentence?: string) {
    if (sentence) {
      super(`${message} (${sentence})`);
    } else {
      super(message);
    }
  }
}
