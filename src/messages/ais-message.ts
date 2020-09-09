import AisBitField from '../ais-bitfield';

class AisMessage {
  type: number;
  repeat: number;
  mmsi: number;

  constructor(messageType: number, bitField: AisBitField) {
    this.type = messageType;
    this.repeat = bitField.getInt(6, 2);
    this.mmsi = bitField.getInt(8, 30);
  }
}

export default AisMessage;
