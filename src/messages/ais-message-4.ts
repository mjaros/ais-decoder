import AisMessage from './ais-message';
import AisBitField from '../ais-bitfield';
import format from '../format';

class AisMessage4 extends AisMessage {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  accuracy: boolean;
  lon: number;
  lat: number;
  epfd: number;
  raim: boolean;
  radio: number;

  constructor(messageType: number, channel: string, bitField: AisBitField) {
    super(messageType, channel, bitField);
    this.year = format.year(bitField.getInt(38, 14));
    this.month = format.month(bitField.getInt(52, 4));
    this.day = format.day(bitField.getInt(56, 5));
    this.hour = format.hour(bitField.getInt(61, 5));
    this.minute = format.minute(bitField.getInt(66, 6));
    this.second = format.second(bitField.getInt(72, 6));
    this.accuracy = bitField.getBoolean(78, 1);
    this.lon = format.longitude(bitField.getSignedInt(79, 28));
    this.lat = format.latitude(bitField.getSignedInt(107, 27));
    this.epfd = bitField.getInt(134, 4);
    this.raim = bitField.getBoolean(148, 1);
    this.radio = bitField.getInt(149, 19);
  }
}

export default AisMessage4;
