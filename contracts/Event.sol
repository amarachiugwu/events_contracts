// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

contract Event {
    string public name;
    string public description;
    uint public date;
    uint public time;
    uint public fee;
    string public venue;

    constructor(
        string memory _name,
        string memory _description,
        uint _date,
        uint _time,
        uint _fee,
        string memory _venue
    ) {
        name = _name;
        description = _description;
        date = _date;
        time = _time;
        fee = _fee;
        venue = _venue;
    }
    
       
}