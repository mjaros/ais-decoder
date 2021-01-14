import 'mocha';
import {expect} from 'chai';
import AisBitfield from '../src/ais-bitfield';

describe('AisBitfield', () => {
  it('should have a proper payload', () => {
    const bitField = new AisBitfield(
      '57lof8`2F5HeT<eC:204e86373:222222222221@8HQC16Ch0:RA7kADPBp888888888880'
    );
    expect(bitField.payload).to.equal(
      '57lof8`2F5HeT<eC:204e86373:222222222221@8HQC16Ch0:RA7kADPBp888888888880'
    );
  });

  it('should have a proper binary payload', () => {
    const bitField = new AisBitfield(
      '57lof8`2F5HeT<eC:204e86373:222222222221@8HQC16Ch0:RA7kADPBp888888888880'
    );
    expect(bitField.binaryPayload).to.equal(
      '000101000111110100110111101110001000101000000010010110000101011000101101100100001100101101010011001010000010000000000100101101001000000110000011000111000011001010000010000010000010000010000010000010000010000010000010000010000010000001010000001000011000100001010011000001000110010011110000000000001010100010010001000111110011010001010100100000010010111000001000001000001000001000001000001000001000001000001000001000001000000000'
    );
  });

  describe('getString()', () => {
    it('should remove trailing "@"', () => {
      const bitField = new AisBitfield(
        '53E`9A8000022222220Dp<58p61V0lTMDDh0000N00000t@Q10888888888888888888800'
      );
      // Original string content is "ENCARNA Y MIGUEL@@@@"
      const name = bitField.getString(112, 120);
      expect(name).to.equal('ENCARNA Y MIGUEL');
    });

    it('should remove trailing "@" with garbage afterwards', () => {
      const bitField = new AisBitfield(
        '56SWp3P000033WO;WKI<4m1Tv0pvs73400000=G40000040000000000000000000000008'
      );
      // Original string content is "SAMPYO NO.101@@@@@CU"
      const name = bitField.getString(112, 120);
      expect(name).to.equal('SAMPYO NO.101');
    });
  });
});
