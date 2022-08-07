import * as fs from 'fs';

const buff = fs.readFileSync('./public/test.svg');
const base64data = buff.toString('base64');

const mime = "data:image/svg+xml;base64,";

fs.writeFileSync('./public/encodedTestSVG', `${mime}${base64data}`);