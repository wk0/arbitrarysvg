// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "forge-std/Script.sol";
import "../src/ArbitrarySVGScript.sol";

contract DeployArbitrarySVGScript is Script {
  function run() external {

    vm.startBroadcast();
    new ArbitrarySVGScript("ArbitrarySVG", "ASVG", "");
    vm.stopBroadcast();
  }
}