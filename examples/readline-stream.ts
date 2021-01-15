import AisDecoder from '../src/ais-decoder';
import {createReadStream} from 'fs';
import {resolve} from 'path';
import {createInterface} from 'readline';

const aisDecoder = new AisDecoder();
aisDecoder.on('error', err => console.error(err));
aisDecoder.on('data', decodedMessage => {
  const message = JSON.parse(decodedMessage);
  if (message.type === 8) {
    console.log(decodedMessage);
  }
});

const filePath = resolve(__dirname, './messages.txt');
const fileStream = createReadStream(filePath);
const readLine = createInterface(fileStream);
readLine.on('line', line => aisDecoder.write(line));
