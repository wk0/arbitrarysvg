import * as fs from 'fs';

// TODO minify SVG with:
// https://github.com/svg/svgo
// svgo test.svg -o test.min.svg 
// 
// Minify inner SVG script with 
// https://github.com/coderaiser/minify
// minify script.js > script.min.js

// read SVG and encode
const buff = fs.readFileSync('./public/test3.svg');
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