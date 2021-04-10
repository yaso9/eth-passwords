//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;
pragma experimental "ABIEncoderV2";

contract PasswordStore {
  mapping(address => string[]) data;

  function addEntry(string memory entry) public {
    data[msg.sender].push(entry);
  }

  function removeEntry(uint idx) public {
    string[] storage arr = data[msg.sender];
    require(idx < arr.length);
    arr[idx] = arr[arr.length-1];
    arr.pop();
  }

  function getEntries() public view returns (string[] memory) {
    return data[msg.sender];
  }
}
