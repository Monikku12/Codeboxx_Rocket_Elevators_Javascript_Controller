const { identity, floor, isEmpty, slice, over } = require("lodash")
let elevatorID = 1;
let floorRequestButtonID = 1;
let callButtonID = 1;  

class Column {
    constructor(_id, _status, _amountOfFloors, _amountOfElevators) {
        this.ID = _id
        this.status = _status
        this.elevatorList = []
        this.callButtonList = []
        this.createElevators(_amountOfFloors, _amountOfElevators)
        this.createCallButtons(_amountOfFloors)
    };
    
    //---------------------------------Methods--------------------------------------------//
    createCallButtons(_amountOfFloors) {
        var buttonFloor = 1;
        
        for (let i = 0; i < _amountOfFloors; i++) {
            if (buttonFloor < _amountOfFloors) { //If it's not the last floor
                var callButton = new CallButton(callButtonID, "OFF", buttonFloor, "Up"); //id, status, floor, direction
                this.callButtonList.push(callButton);
                callButtonID++;
            }
            
            if (buttonFloor > 1) { //If it's not the first floor
                var callButton = new CallButton(callButtonID, "OFF", buttonFloor, "Down"); //id, status, floor, direction
                this.callButtonList.push(callButton);
                callButtonID++;
            }
            buttonFloor++;
        }     
    }

    createElevators(_amountOfFloors, _amountOfElevators) {
        for (let i = 0; i < _amountOfElevators; i++) {
            var elevator = new Elevator(elevatorID, "idle", _amountOfFloors, 1); //id, status, amountOfFloors, currentFloor
            this.elevatorList.push(elevator);
            elevatorID++;
        }
    }

    //Simulate when a user press a button outside the elevator
    requestElevator(floor, direction) {        
        elevator.this.findElevator(floor, direction) = bestElevator;
            elevator.requestList.add(floor);
            elevator.move;
            elevator.operateDoors;
            return elevator;
        }

    //We use a score system depending on the current elevators state. Since the bestScore and the referenceGap are
    //higher values than what could be possibly calculated, the first elevator will always become the default bestElevator,
    //before being compared with to other elevators. If two elevators get the same score, the nearest one is prioritized.
    findElevator(requestedFloor, requestedDirection) {
        let bestElevator;
        let bestScore = 5
        let referenceGap = 10000000;
        let bestElevatorInformations;
        
        this.elevatorList.forEach((elevator) => {
        //The elevator is at my floor and going in the direction I want
        if (requestedFloor = elevator.currentFloor && elevator.status == stopped && requestedDirection == elevator.direction) {
            bestElevatorInformations.this.checkIfElevatorIsBetter(1, elevator, bestScore, referenceGap, bestElevator, requestedFloor) = bestElevatorInformations //check call & return
        //The elevator is lower than me, is coming up and I want to go up
        } else if (requestedFloor > elevator,currentFloor && elevator.direction == "up" && requestedDirection == elevator.direction) {
            bestElevatorInformations.this.checkIfElevatorIsBetter(2, elevator, bestScore, referenceGap, bestElevator, requestedFloor) = bestElevatorInformations; //check return
            //The elevator is higher than me, is coming down and I want to go down
        } else if (requestedFloor < elevator.currentFloor && elevator.direction == "down" && requestedDirection == elevator.direction) {
            bestElevatorInformations.this.checkIfElevatorIsBetter(2, elevator, bestScore, referenceGap, bestElevator, requestedFloor) = bestElevatorInformations;
            //The elevator is idle
        } else if (elevator.status = idle) {
            bestElevatorInformations.this.checkIfElevatorIsBetter(3, elevator, bestScore, referenceGap, bestElevator, requestedFloor) = bestElevatorInformations;
            //The elevator is not available, but still could take the call if nothing better is found
        } else {
            bestElevatorInformations.this.checkIfElevatorIsBetter(4, elevator, bestScore, referenceGap, bestElevator, requestedFloor) = bestElevatorInformations;
        }
        bestElevator = bestElevatorInformations.bestElevator;
        bestScore = bestElevatorInformations.bestScore;
        referenceGap = bestElevatorInformations.referenceGap;
        });
        return bestElevator;
    }

    checkIfElevatorIsBetter(scoreToCheck, newElevator, bestScore, referenceGap, bestElevator, floor) {
        if (scoreToCheck < bestScore) {
            bestScore = scoreToCheck;
            bestElevator = newElevator;
            referenceGap = newElevator.currentFloor(Math.abs("")) - floor;
        } else if (bestScore = scoreToCheck) {
            gap = newElevator.currentFloor(Math.abs("")) - floor;
            if (referenceGap > gap) {
                bestElevator = newElevator;
                referenceGap = gap;
            }
        }
        return bestElevatorInformations(bestElevator, bestScore, referenceGap);
    }
}


class Elevator {
    constructor(_id, _status, _amountOfFloors, _currentFloor) {
        this.ID = _id
        this.status = _status
        this.currentFloor = _currentFloor
        this.direction = null
        this.door = new Door(_id, "closed")
        this.floorRequestsButtonsList = []
        this.floorRequestList = []
        this.createFloorRequestButtons(_amountOfFloors)
    }

createFloorRequestButtons(_amountOfFloors) {
    var buttonFloor = 1
    for (let i = 0; i < _amountOfFloors; i++) {
        var floorRequestButton = new FloorRequestButton(floorRequestButtonID, "OFF", buttonFloor);
        floorRequestButton.add = this.floorRequestsButtonsList;
        buttonFloor++;
        floorRequestButtonID++;
    }   
}

//Simulate when a user press a button inside the elevator
requestFloor(floor) {
    floor.add = this.requestList;
    this.move;
    this.operateDoors;
}

move() {
    while (this.requestList !== isEmpty) {
        var destination = this.requestList.firstElement;
        this.status = moving;
        if (this.currentFloor < destination) {
            this.direction = "up";
            this.sortFloorList;
            while (this.currentFloor < destination) {
                this.currentFloor++;
                this.screenDisplay = this.currentFloor;
            }
        } else if (this.currentFloor > destination) {
            this.direction = "down";
            this.sortFloorList;
            while (this.currentFloor > destination) {
                this.currentFloor--;
                this.screenDisplay = this.currentFloor;
            }
        }
        this.status = stopped;
        slice(this.requestList.firstElement);
    }
    this.status = idle;
}


sortFloorList() {
    if (this.direction = "up") {
        this.requestList.sort;
    } else{
        this.requestList.reverse;
    }
}

operateDoors() {
    this.door.status = opened;
    console.log("Wait 5 secondes.")
    if (this !== overweight) {
        this.door.status = closing;
        if (obstruction = false) {
        this.door.status = "closed";
        } else {
            this.operateDoors;
        }
    } else {
        while (this.isOverweight) {
           console.log("Activate overweight alarm");
        }
        this.operateDoors
    }
}
}

class CallButton {
    constructor(_id, _status, _floor, _direction) {
        this.ID = _id
        this.status = _status
        this.floor = _floor
        this.direction = _direction
    }
}

class FloorRequestButton {
    constructor(_id, _status, _floor) {
        this.ID = _id
        this.status = _status
        this.floor = _floor
    }
}

class Door {
    constructor(_id, _status) {
        this.ID = _id
        this.status = _status
    }
}

module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door }

var testColumn = new Column(1, "online", 10, 2);
var testDoor = new Door(1, );
var testFloorRequestButton = new FloorRequestButton(1, _status, 7);
var testCallButton = new CallButton(1, _status, _floor, _direction);
// var testElevator1 = new Elevator(1, _status, 10, 2);
// var testElevator2 = new Elevator(2, _status, 10, 6);
