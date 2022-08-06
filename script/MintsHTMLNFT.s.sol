// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "forge-std/Script.sol";
import "../src/sHTMLNFT.sol";
import "openzeppelin-contracts/contracts/utils/Base64.sol";


contract MintHTMLNFT is Script {
  sHTMLNFT public nft;

  constructor () {
    nft = new sHTMLNFT("NFTSite", "sHTML", "");
  }

  function run() external {
    uint256 tokenId = nft.mintTo{value: 0.08 ether}(address(1));
    string memory tokenURI = nft.tokenURI(tokenId);
    console.log(tokenURI);
  }
}