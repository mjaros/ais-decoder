import AisMessage from './ais-message';
import AisBitField from '../ais-bitfield';
import {isAuxiliaryCraft} from '../helpers';
import {DecodingError} from '../errors';

class AisMessage24 extends AisMessage {
  partNum: number;
  name?: string; // Part A
  typeAndCargo?: number; // Part B
  vendorId?: string; // Part B
  model?: number; // Part B
  serial?: number; // Part B
  callsign?: string; // Part B
  dimBow?: number; // Part B
  dimStern?: number; // Part B
  dimPort?: number; // Part B
  dimStarboard?: number; // Part B
  mothershipMMSI?: number; // Part B

  // eslint-disable-next-line max-statements
  constructor(messageType: number, channel: string, bitField: AisBitField) {
    super(messageType, channel, bitField);
    this.partNum = bitField.getInt(38, 2);

    if (this.partNum === 0) {
      this.setPartAProperties(bitField);
    } else if (this.partNum === 1) {
      this.setPartBProperties(bitField);
    } else {
      throw new DecodingError(
        `Invalid part number '${this.partNum}' while decoding message type 24`
      );
    }
  }

  setPartAProperties(bitField: AisBitField): void {
    this.name = bitField.getString(40, 120);
  }

  setPartBProperties(bitField: AisBitField): void {
    this.typeAndCargo = bitField.getInt(40, 8);
    this.vendorId = bitField.getString(48, 18);
    this.model = bitField.getInt(66, 4);
    this.serial = bitField.getInt(70, 20);
    this.callsign = bitField.getString(90, 42);

    if (isAuxiliaryCraft(this.mmsi)) {
      this.mothershipMMSI = bitField.getInt(132, 30);
    } else {
      this.dimBow = bitField.getInt(132, 9);
      this.dimStern = bitField.getInt(141, 9);
      this.dimPort = bitField.getInt(150, 6);
      this.dimStarboard = bitField.getInt(156, 6);
    }
  }
}

export default AisMessage24;
