import AisDecoder from '../src/ais-decoder';

const aisDecoder = new AisDecoder();
aisDecoder.on('error', err => console.error(err));
aisDecoder.on('data', decodedMessage => console.log(decodedMessage));

const nmea = '!AIVDM,1,1,,B,133i;RPP1DPEbcDMV@1r:Ow:2>`<,0*41';
aisDecoder.write(nmea);

// {"type":1,"repeat":0,"mmsi":205278090,"navStatus":0,"rateOfTurn":null,"speedOverGround":8.4,"accuracy":true,"lon":4.73319,"lat":51.725665,"courseOverGround":260.1,"heading":null,"utcSecond":37,"specialManoeuvre":0,"raim":true,"radio":59916}
