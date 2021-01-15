import 'mocha';
import {expect} from 'chai';
import AisMessage8 from '../../src/messages/ais-message-8';
import AisMessage8InlandStatic from '../../src/messages/ais-message-8-inland-static';
import AisBitField from '../../src/ais-bitfield';

describe('AisMessage8', () => {
  it('should return an inland static message on matching dac/fid combination', () => {
    const sentence = '!AIVDM,1,1,,B,83aL>A@j2d<t=LMtMA4hN?aE2B00,0*75';
    const messageParts = sentence.split(',');
    const bitField = new AisBitField(messageParts[5]);
    const message = new AisMessage8(8, messageParts[4], bitField);
    expect(message).to.be.instanceOf(AisMessage8InlandStatic);
  });
});
