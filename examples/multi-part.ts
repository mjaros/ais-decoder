import AisDecoder from '../src/ais-decoder';

const aisDecoder = new AisDecoder();
aisDecoder.on('error', err => console.error(err));
aisDecoder.on('data', decodedMessage => console.log(decodedMessage));

const part1 =
  '!AIVDM,2,1,7,A,57lof8`2F5HeT<eC:204e86373:222222222221@8HQC16Ch0:RA7kAD,0*28';
const part2 = '!AIVDM,2,2,7,A,PBp888888888880,2*79';

aisDecoder.write(part1);
aisDecoder.write(part2);

// {"type":5,"repeat":0,"mmsi":525200930,"aisVersion":2,"imo":9835915,"callsign":"YCKT2","name":"AKRA 102","typeAndCargo":80,"dimBow":67,"dimStern":33,"dimPort":19,"dimStarboard":1,"epfd":1,"etaMonth":9,"etaDay":7,"etaHour":16,"etaMinute":0,"draught":4.2,"destination":"MERAK            @@@","dte":false}
