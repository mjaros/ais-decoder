# AIS Stream Decoder

AIS/NMEA decoder with native stream interface for [Node.js](http://nodejs.org).

[![NPM Version][npm-image]][npm-url]

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).

Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install ais-stream-decoder
```

## Features

- Currently supports message types 1,2,3,4,5,18,24 (more to come)
- Handles multi-part messages out of the box
- Streaming API implemented as a [Node.js transform stream](https://nodejs.org/docs/latest/api/stream.html#stream_duplex_and_transform_streams)
- Returns nicely formatted JSON messages
- Written in TypeScript

## Usage

### Decode a single line of data:

```js
import AisDecoder from 'ais-stream-decoder';

const aisDecoder = new AisDecoder();
aisDecoder.on('error', err => console.error(err));
aisDecoder.on('data', decodedMessage => console.log(decodedMessage));

const nmea = '!AIVDM,1,1,,B,133i;RPP1DPEbcDMV@1r:Ow:2>`<,0*41';
aisDecoder.write(nmea);
```

=>

```bash
{"type":1,"repeat":0,"mmsi":205278090,"navStatus":0,"rateOfTurn":null,"speedOverGround":8.4,"accuracy":true,"lon":4.73319,"lat":51.725665,"courseOverGround":260.1,"heading":null,"utcSecond":37,"specialManoeuvre":0,"raim":true,"radio":59916}
```

### Handles multi-part messages like a pro:

```js
import AisDecoder from 'ais-stream-decoder';

const aisDecoder = new AisDecoder();
aisDecoder.on('error', err => console.error(err));
aisDecoder.on('data', decodedMessage => console.log(decodedMessage));

const part1 =
  '!AIVDM,2,1,7,A,57lof8`2F5HeT<eC:204e86373:222222222221@8HQC16Ch0:RA7kAD,0*28';
const part2 = '!AIVDM,2,2,7,A,PBp888888888880,2*79';

aisDecoder.write(part1);
aisDecoder.write(part2);
```

=>

```bash
{"type":5,"repeat":0,"mmsi":525200930,"aisVersion":2,"imo":9835915,"callsign":"YCKT2","name":"AKRA 102","typeAndCargo":80,"dimBow":67,"dimStern":33,"dimPort":19,"dimStarboard":1,"epfd":1,"etaMonth":9,"etaDay":7,"etaHour":16,"etaMinute":0,"draught":4.2,"destination":"MERAK            @@@","dte":false}
```

### Use it to read and decode NMEA line-by-line from a file:

```js
import AisDecoder from 'ais-stream-decoder';
import {createReadStream} from 'fs';
import {resolve} from 'path';
import {createInterface} from 'readline';

const aisDecoder = new AisDecoder();
aisDecoder.on('error', err => console.error(err));
aisDecoder.on('data', decodedMessage => console.log(decodedMessage));

const fileStream = createReadStream(
  resolve(__dirname, './examples/messages.txt')
);
const readLine = createInterface(fileStream);
readLine.on('line', line => aisDecoder.write(line));
```

### We all love pipes! ❤

```js
import AisDecoder from 'ais-stream-decoder';
import split from 'split';
import {createReadStream} from 'fs';
import {resolve} from 'path';

const fileStream = createReadStream(
  resolve(__dirname, './examples/messages.txt')
);
const aisDecoder = new AisDecoder({silent: true});

fileStream
  .pipe(split())
  .pipe(aisDecoder)
  .on('data', decodedMessage => {
    console.log(decodedMessage);
  });
```

## License

[MIT](https://github.com/mjaros/ais-decoder/blob/HEAD/LICENSE)

[npm-image]: https://img.shields.io/npm/v/ais-stream-decoder.svg
[npm-url]: https://npmjs.org/package/ais-stream-decoder
