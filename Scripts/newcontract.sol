// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
contract MainContract {
  
  function execute(address payable _address) public payable{
    _address.transfer(address(this).balance);
  }

}