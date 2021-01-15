/* eslint-disable max-statements */
import 'mocha';
import {expect} from 'chai';
import AisMessage8InlandStatic from '../../src/messages/ais-message-8-inland-static';
import AisBitField from '../../src/ais-bitfield';

describe('AisMessage8InlandStatic', () => {
  const sentence = '!AIVDM,1,1,,B,83aL>A@j2d<t=LMtMA4hN?aE2B00,0*75';
  const messageParts = sentence.split(',');
  const bitField = new AisBitField(messageParts[5]);
  const message = new AisMessage8InlandStatic(8, messageParts[4], bitField);

  it('should set correct "dac"', () => {
    expect(message.dac).to.equal(200);
  });

  it('should set correct "fid"', () => {
    expect(message.fid).to.equal(10);
  });

  it('should set correct "eni"', () => {
    expect(message.eni).to.equal('03051715');
  });

  it('should set correct "length"', () => {
    expect(message.length).to.equal(55);
  });

  it('should set correct "beam"', () => {
    expect(message.beam).to.equal(6);
  });

  it('should set correct "shipType"', () => {
    expect(message.shipType).to.equal(8010);
  });

  it('should set correct "hazardCode"', () => {
    expect(message.hazardCode).to.equal(5);
  });

  it('should set correct "draught"', () => {
    expect(message.draught).to.equal(0.73);
  });

  it('should set correct "loadStatus"', () => {
    expect(message.loadStatus).to.equal(0);
  });

  it('should set correct "speedQuality"', () => {
    expect(message.speedQuality).to.equal(false);
  });

  it('should set correct "courseQuality"', () => {
    expect(message.courseQuality).to.equal(false);
  });

  it('should set correct "headingQuality"', () => {
    expect(message.headingQuality).to.equal(false);
  });
});
