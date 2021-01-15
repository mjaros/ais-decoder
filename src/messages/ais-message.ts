import AisBitField from '../ais-bitfield';

class AisMessage {
  type: number;
  channel: string;
  repeat: number;
  mmsi: number;
  sentences: Array<string>;

  constructor(messageType: number, channel: string, bitField: AisBitField) {
    this.type = messageType;
    this.channel = channel;
    this.repeat = bitField.getInt(6, 2);
    this.mmsi = bitField.getInt(8, 30);
  }
}

export default AisMessage;
