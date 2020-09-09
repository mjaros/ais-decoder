import AisMessage from './ais-message';
import AisBitField from '../ais-bitfield';
import format from '../format';

class AisMessage5 extends AisMessage {
  aisVersion: number;
  imo: number;
  callsign: string;
  name: string;
  typeAndCargo: number;
  dimBow: number;
  dimStern: number;
  dimPort: number;
  dimStarboard: number;
  epfd: number;
  etaMonth: number;
  etaDay: number;
  etaHour: number;
  etaMinute: number;
  draught: number;
  destination: string;
  dte: boolean;

  // eslint-disable-next-line max-statements
  constructor(messageType: number, bitField: AisBitField) {
    super(messageType, bitField);
    this.aisVersion = bitField.getInt(38, 2);
    this.imo = bitField.getInt(40, 30);
    this.callsign = bitField.getString(70, 42);
    this.name = bitField.getString(112, 120);
    this.typeAndCargo = bitField.getInt(232, 8);
    this.dimBow = bitField.getInt(240, 9);
    this.dimStern = bitField.getInt(249, 9);
    this.dimPort = bitField.getInt(258, 6);
    this.dimStarboard = bitField.getInt(264, 6);
    this.epfd = bitField.getInt(270, 4);
    this.etaMonth = format.month(bitField.getInt(274, 4));
    this.etaDay = format.day(bitField.getInt(278, 5));
    this.etaHour = format.hour(bitField.getInt(283, 5));
    this.etaMinute = format.minute(bitField.getInt(288, 6));
    this.draught = format.draught(bitField.getInt(294, 8));
    this.destination = bitField.getString(320, 120);
    this.dte = bitField.getBoolean(422, 1);
  }
}

export default AisMessage5;
