import AisBitField from '../ais-bitfield';
import AisMessage from './ais-message';
import format from '../format';

class AisMessage8InlandStatic extends AisMessage {
  dac: number;
  fid: number;
  eni: string;
  length: number;
  beam: number;
  shipType: number;
  hazardCode: number;
  draught: number;
  loadStatus: number;
  speedQuality: boolean;
  courseQuality: boolean;
  headingQuality: boolean;

  // eslint-disable-next-line max-statements
  constructor(messageType: number, channel: string, bitField: AisBitField) {
    super(messageType, channel, bitField);
    this.dac = bitField.getInt(40, 10);
    this.fid = bitField.getInt(50, 6);
    this.eni = bitField.getString(56, 48);
    this.length = format.inlandLengthOrBeam(bitField.getInt(104, 13));
    this.beam = format.inlandLengthOrBeam(bitField.getInt(117, 10));
    this.shipType = bitField.getInt(127, 14);
    this.hazardCode = bitField.getInt(141, 3);
    this.draught = format.inlandDraught(bitField.getInt(144, 11));
    this.loadStatus = bitField.getInt(155, 2);
    this.speedQuality = bitField.getBoolean(157, 1);
    this.courseQuality = bitField.getBoolean(158, 1);
    this.headingQuality = bitField.getBoolean(159, 1);
  }
}

export default AisMessage8InlandStatic;
