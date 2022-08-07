// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "forge-std/Script.sol";
import "../src/ArbitrarySVG.sol";

contract DeployArbitrarySVG is Script {
  function run() external {

    vm.startBroadcast();
    new ArbitrarySVG();
    vm.stopBroadcast();
  }
}