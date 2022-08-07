// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "forge-std/Script.sol";
import "../src/ArbitrarySVG.sol";
import "openzeppelin-contracts/contracts/utils/Base64.sol";


contract MintArbitrarySVG is Script {
  ArbitrarySVG public nft;

  constructor () {
    nft = new ArbitrarySVG("ArbitrarySVG", "ASVG", "");
  }

  function run() external {
    uint256 tokenId = nft.mintTo{value: 0.01 ether}(address(1));
    string memory tokenURI = nft.tokenURI(tokenId);
    console.log(tokenURI);
  }
}