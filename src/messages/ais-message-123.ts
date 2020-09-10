import AisMessage from './ais-message';
import AisBitField from '../ais-bitfield';
import format from '../format';

class AisMessage123 extends AisMessage {
  navStatus: number;
  rateOfTurn: number;
  speedOverGround: number;
  accuracy: boolean;
  lon: number;
  lat: number;
  courseOverGround: number;
  heading: number;
  utcSecond: number;
  specialManoeuvre: number;
  raim: boolean;
  radio: number;

  constructor(messageType: number, channel: string, bitField: AisBitField) {
    super(messageType, channel, bitField);
    this.navStatus = bitField.getInt(38, 4);
    this.rateOfTurn = format.rateOfTurn(bitField.getSignedInt(42, 8));
    this.speedOverGround = format.speedOverGround(bitField.getInt(50, 10));
    this.accuracy = bitField.getBoolean(60, 1);
    this.lon = format.longitude(bitField.getSignedInt(61, 28));
    this.lat = format.latitude(bitField.getSignedInt(89, 27));
    this.courseOverGround = format.courseOverGround(bitField.getInt(116, 12));
    this.heading = format.heading(bitField.getInt(128, 9));
    this.utcSecond = bitField.getInt(137, 6);
    this.specialManoeuvre = bitField.getInt(143, 2);
    this.raim = bitField.getBoolean(148, 1);
    this.radio = bitField.getInt(149, 19);
  }
}

export default AisMessage123;
