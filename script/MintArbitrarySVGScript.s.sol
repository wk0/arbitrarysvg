
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "forge-std/Script.sol";
import "../src/ArbitrarySVGScript.sol";
import "openzeppelin-contracts/contracts/utils/Base64.sol";


contract MintArbitrarySVGScript is Script {
  ArbitrarySVGScript public nft;

  constructor () {
    nft = new ArbitrarySVGScript("ArbitrarySVGScript", "ASVGS", "");
  }

  function run() external {
    string memory script = 'window.addEventListener("DOMContentLoaded",(()=>{document.querySelector("circle").addEventListener("click",(t=>{t.target.style.fill=function(){const t=Math.round(255*Math.random()).toString(16).padStart(2,"0"),n=Math.round(255*Math.random()).toString(16).padStart(2,"0"),r=Math.round(255*Math.random()).toString(16).padStart(2,"0");return"#".concat(t.toString(),n.toString(),r.toString())}()}))}));';
    uint256 tokenId = nft.mintTo{value: 0.05 ether}(address(1), script);
    string memory tokenURI = nft.tokenURI(tokenId);
    console.log(tokenURI);
  }
}