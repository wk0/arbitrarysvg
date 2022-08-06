// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "forge-std/Script.sol";
import "../src/sHTMLNFT.sol";

contract DeploysHTMLNFT is Script {
  function run() external {

    string memory name = "NFTSite";
    string memory symbol = "sHTML";
    string memory baseURI = "";

    vm.startBroadcast();
    new sHTMLNFT(name, symbol, baseURI);
    vm.stopBroadcast();
  }
}