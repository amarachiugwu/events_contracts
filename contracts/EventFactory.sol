// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import './Event.sol';
import './EventTicket.sol';

contract EventFactory {

    // array of created events
    Event[] eventAddresses;
    EventTicket[] ticketAddresses;
    event NewEvent(Event);
    event NewTicket(EventTicket);

    function cloneEvent(
        string memory name,
        string memory description,
        uint date_time,
        // uint time,
        uint fee,
        string memory venue,
        EventTicket ticket
    )  public returns(EventTicket _ticket, Event eventAddr){
        _ticket = new EventTicket(0.01 ether, 1000);
        eventAddr = new Event(name, description, date_time, fee, venue, ticket);
        ticketAddresses.push(ticket);
        eventAddresses.push(eventAddr);
        emit NewEvent(eventAddr);
        emit NewTicket(ticket);
    }

    // function getEventOwner(address eventAddress) external {
        
    // }

    function getEventAddresses() public view returns(Event[] memory _eventAddresses){
        _eventAddresses = eventAddresses;
    }

    function getTicketAddresses() public view returns(EventTicket[] memory _ticketAddresses){
        _ticketAddresses = ticketAddresses;
    }
    
}