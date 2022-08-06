// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "forge-std/Script.sol";
import "../src/HTMLNFT.sol";

contract DeployHTMLNFT is Script {
  function run() external {

    string memory name = "NFTSite";
    string memory symbol = "HTML";
    string memory baseURI = "";

    vm.startBroadcast();
    new HTMLNFT(name, symbol, baseURI);
    vm.stopBroadcast();
  }
}