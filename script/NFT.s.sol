// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "forge-std/Script.sol";
import "../src/NFT.sol";

contract DeployNFT is Script {
  function run() external {

    string memory name = "WAV";
    string memory symbol = "WAV";
    string memory baseURI = "";

    vm.startBroadcast();
    new NFT(name, symbol, baseURI);
    vm.stopBroadcast();
  }
}