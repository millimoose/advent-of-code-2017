/**
 * Calculates the checksum of an input file.
 */

import * as fs from 'fs';
import * as readline from 'readline';

import * as _lib from '../lib';

console.log('index.ts');

const inStream = fs.createReadStream('input.txt');
const inReader = readline.createInterface(inStream);

const summer = new _lib.CheckSummer(_lib.evenDivLineSum);
inReader.on('line', (line: string) => {
    summer.addLine(line);
});
inReader.on('close', () => {
    console.info(`sum = ${summer.sum}`);
});
