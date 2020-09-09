import AisSentence from './ais-sentence';

export class DecodingError extends Error {
  constructor(message: string, sentence: AisSentence) {
    super(`${message} for sentence ${sentence.message}`);
  }
}
