import * as fs from 'fs';

// read SVG and encode
const buff = fs.readFileSync('./public/test.svg');
const base64data = buff.toString('base64');
const mime = "data:image/svg+xml;base64,";

// create json tokenURI string
const json = `{"name": "NFT #1", "description": "Test", "image_data": "${mime}${base64data}"}`;

// encode json
const jsonBuffer = Buffer.from(json);
const encoded = jsonBuffer.toString('base64');
const outputMime = 'data:application/json;base64,'

// write out simulated tokenURI
fs.writeFileSync('./public/encodedTestSVG', `${outputMime}${encoded}`);