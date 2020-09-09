import {createReadStream} from 'fs';
import {resolve} from 'path';
import {createInterface} from 'readline';
import AisDecoder from '../src/ais-decoder';

const aisDecoder = new AisDecoder();
aisDecoder.on('error', err => console.error(err));
aisDecoder.on('data', message => console.log(message));

const filePath = resolve(__dirname, './messages.txt');
const fileStream = createReadStream(filePath);
const readLine = createInterface(fileStream);
readLine.on('line', line => aisDecoder.write(line));
