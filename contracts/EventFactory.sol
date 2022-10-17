// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;
import './Event.sol';

contract EventFactory {

    // array of created events
    Event[] eventAddresses;
    event NewEvent(Event);

    function cloneEvent(
        string memory name,
        string memory description,
        uint date,
        uint time,
        uint fee,
        string memory venue
    ) public returns(Event eventAddr){
        eventAddr = new Event(name, description, date, time, fee, venue);
        eventAddresses.push(eventAddr);
        emit NewEvent(eventAddr);
    }

    function getEventOwner(address eventAddress) external {
        
    }

    function getEventAddresses() public view returns(Event[] memory _eventAddresses){
        _eventAddresses = eventAddresses;
    }
    
}