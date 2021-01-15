import AisMessage from './ais-message';
import AisMessage8InlandStatic from './ais-message-8-inland-static';
import AisBitField from '../ais-bitfield';

class AisMessage8 extends AisMessage {
  dac: number;
  fid: number;

  // eslint-disable-next-line max-statements
  constructor(messageType: number, channel: string, bitField: AisBitField) {
    super(messageType, channel, bitField);
    this.dac = bitField.getInt(40, 10);
    this.fid = bitField.getInt(50, 6);

    if (this.dac === 200 && this.fid === 10) {
      return new AisMessage8InlandStatic(this.type, this.channel, bitField);
    }

    return null;
  }
}

export default AisMessage8;
