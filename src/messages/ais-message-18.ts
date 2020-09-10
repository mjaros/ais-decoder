import AisMessage from './ais-message';
import AisBitField from '../ais-bitfield';
import format from '../format';

class AisMessage18 extends AisMessage {
  speedOverGround: number;
  accuracy: boolean;
  lon: number;
  lat: number;
  courseOverGround: number;
  heading: number;
  utcSecond: number;
  regional: number;
  unitFlag: boolean;
  displayFlag: boolean;
  dscFlag: boolean;
  bandFlag: boolean;
  msg22Flag: boolean;
  modeFlag: boolean;
  raim: boolean;
  radio: number;

  // eslint-disable-next-line max-statements
  constructor(messageType: number, channel: string, bitField: AisBitField) {
    super(messageType, channel, bitField);
    this.speedOverGround = format.speedOverGround(bitField.getInt(46, 10));
    this.accuracy = bitField.getBoolean(56, 1);
    this.lon = format.longitude(bitField.getSignedInt(57, 28));
    this.lat = format.latitude(bitField.getSignedInt(85, 27));
    this.courseOverGround = format.courseOverGround(bitField.getInt(112, 12));
    this.heading = format.heading(bitField.getInt(124, 9));
    this.utcSecond = bitField.getInt(133, 6);
    this.regional = bitField.getInt(139, 2);
    this.unitFlag = bitField.getBoolean(141, 1);
    this.displayFlag = bitField.getBoolean(142, 1);
    this.dscFlag = bitField.getBoolean(143, 1);
    this.bandFlag = bitField.getBoolean(144, 1);
    this.msg22Flag = bitField.getBoolean(145, 1);
    this.modeFlag = bitField.getBoolean(146, 1);
    this.raim = bitField.getBoolean(147, 1);
    this.radio = bitField.getInt(148, 20);
  }
}

export default AisMessage18;
