import 'mocha';
import {expect} from 'chai';
import AisMessage5 from '../../src/messages/ais-message-5';
import AisBitField from '../../src/ais-bitfield';

describe('AisMessage5', () => {
  const part1 =
    '!AIVDM,2,1,7,A,57lof8`2F5HeT<eC:204e86373:222222222221@8HQC16Ch0:RA7kAD,0*28';
  const part2 = '!AIVDM,2,2,7,A,PBp888888888880,2*79';
  const part1Parts = part1.split(',');
  const part2Parts = part2.split(',');
  const bitField = new AisBitField(part1Parts[5] + part2Parts[5]);
  const messageType = 5;
  const channel = part1Parts[4];
  const message = new AisMessage5(messageType, channel, bitField);

  it('should set proper "aisVersion"', () => {
    expect(message.aisVersion).to.equal(2);
  });

  it('should set proper "imo"', () => {
    expect(message.imo).to.equal(9835915);
  });

  it('should set proper "callsign"', () => {
    expect(message.callsign).to.equal('YCKT2');
  });

  it('should set proper "name"', () => {
    expect(message.name).to.equal('AKRA 102');
  });

  it('should set proper "destination"', () => {
    expect(message.destination).to.equal('ID_MERAK');
  });
});
