// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import './EventTicket.sol';

contract Event {
    string public name;
    string public description;
    uint public date_time;
    // uint public time;
    uint public fee;
    string public venue;
    EventTicket public ticket;
    bool ended;

    event Registered(address addr, uint token_id);
    event BoughtForFriend(address addr, uint token_id);
    event Attended(address addr);

    constructor(
        string memory _name,
        string memory _description,
        uint _date_time,
        // uint _time,
        uint _fee,
        string memory _venue,
        EventTicket _ticket
    ) {
        name = _name;
        description = _description;
        date_time = _date_time;
        // time = _time;
        fee = _fee;
        venue = _venue;
        ticket = _ticket;
    }

    // user registers for event by buying a ticket
    // if a user wishes to buy ticket for another user, they can buy for a friend
    function register() payable external {
        require(EventTicket(ticket).balanceOf(msg.sender) <= 0, "You already have a ticket");
        require(msg.value >= fee, "Not enough ETH");
        uint tokenId = EventTicket(ticket).safeMint{value: msg.value}(msg.sender);
        emit Registered(msg.sender, tokenId);
    }

    function buyForFriend(address friend) payable external {
        uint tokenId = EventTicket(ticket).safeMint{value: msg.value}(friend);
        emit BoughtForFriend(friend, tokenId);
    }


    function attend() external  {
        
        require(EventTicket(ticket).balanceOf(msg.sender) > 0, "You don't have a ticket");
        require(date_time <= block.timestamp, "Event has not started");
        require(!ended, "Event has ended");
        // EventTicket(ticket).burn(EventTicket(ticket).tokenOfOwnerByIndex(msg.sender, 0));
        emit Attended(msg.sender);

    }

    function balance_of () public view returns (uint bal) {
        bal = EventTicket(ticket).balanceOf(msg.sender);
    }
        
    
    
       
}