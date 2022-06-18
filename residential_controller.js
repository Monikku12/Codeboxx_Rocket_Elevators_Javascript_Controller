const { identity, floor, isEmpty, slice, over } = require("lodash")
//let elevatorID = 1;
let floorRequestButtonID = 1;
let callButtonID = 1;  

class Column {
    constructor(_id, _amountOfFloors, _amountOfElevators) {
        this.ID = 1
        this.status = "online"
        this.amountOfFloors = _amountOfFloors
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
                var callButton = new CallButton(callButtonID, buttonFloor, "Up"); //id, status, floor, direction
                this.callButtonList.push(callButton);
                callButtonID++;
            }
            
            if (buttonFloor > 1) { //If it's not the first floor
                var callButton = new CallButton(callButtonID, buttonFloor, "Down"); //id, status, floor, direction
                this.callButtonList.push(callButton);
                callButtonID++;
            }
            buttonFloor++;
        }     
    }

    createElevators(_amountOfFloors, _amountOfElevators) {
        for (let i = 0; i < _amountOfElevators; i++) {
            var elevator = new Elevator(i+1, _amountOfFloors, 1); //id, status, amountOfFloors, currentFloor
            this.elevatorList.push(elevator);
        }
    }

    //Simulate when a user press a button outside the elevator
    requestElevator(floor, direction) {  
        let elevator = this.findElevator(floor, direction);
        elevator.floorRequestList.push(floor);
        elevator.move();
        elevator.operateDoors();
            return elevator;
        
        }

    //We use a score system depending on the current elevators state. Since the bestScore and the referenceGap are
    //higher values than what could be possibly calculated, the first elevator will always become the default bestElevator,
    //before being compared with to other elevators. If two elevators get the same score, the nearest one is prioritized.
    findElevator(requestedFloor, requestedDirection) {
        let bestElevator;
        let bestScore = 5
        let referenceGap = 10000000;
        let bestElevatorInformations = {bestElevator:bestElevator, bestScore:bestScore, referenceGap:referenceGap};
        
        this.elevatorList.forEach(elevator => {
        //The elevator is at my floor and going in the direction I want
        if (requestedFloor == elevator.currentFloor && elevator.status == "stopped" && requestedDirection == elevator.direction) {
            bestElevatorInformations = this.checkIfElevatorIsBetter(1, elevator, bestElevatorInformations, requestedFloor);
        //The elevator is lower than me, is coming up and I want to go up
        } else if (requestedFloor > elevator.currentFloor && elevator.direction == "up" && requestedDirection == elevator.direction) {
            bestElevatorInformations = this.checkIfElevatorIsBetter(2, elevator, bestElevatorInformations, requestedFloor);
            //The elevator is higher than me, is coming down and I want to go down
        } else if (requestedFloor < elevator.currentFloor && elevator.direction == "down" && requestedDirection == elevator.direction) {
            bestElevatorInformations = this.checkIfElevatorIsBetter(2, elevator, bestElevatorInformations, requestedFloor);
            //The elevator is idle
        } else if (elevator.status == "idle") {
            bestElevatorInformations = this.checkIfElevatorIsBetter(3, elevator, bestElevatorInformations, requestedFloor);
            //The elevator is not available, but still could take the call if nothing better is found
        } else {
            bestElevatorInformations = this.checkIfElevatorIsBetter(4, elevator, bestElevatorInformations, requestedFloor);
        }
        });
        return bestElevatorInformations.bestElevator;
    }

    checkIfElevatorIsBetter(scoreToCheck, newElevator, bestElevatorInformations, floor) {
        if (scoreToCheck < bestElevatorInformations.bestScore) {
            bestElevatorInformations.bestScore = scoreToCheck;
            bestElevatorInformations.bestElevator = newElevator;
            bestElevatorInformations.referenceGap = Math.abs(newElevator.currentFloor - floor);
        } else if (bestElevatorInformations.bestScore == scoreToCheck) {
            let gap = Math.abs(newElevator.currentFloor - floor);
            if (bestElevatorInformations.referenceGap > gap) {
                bestElevatorInformations.bestElevator = newElevator;
                bestElevatorInformations.referenceGap = gap;
            }
        }
        return bestElevatorInformations
    }
}


class Elevator {
    constructor(_id, _amountOfFloors) {
        this.ID = _id
        this.status = "idle"
        this.currentFloor = 1
        this.amountOfFloors = _amountOfFloors
        this.direction = null
        this.door = new Door(_id, "closed")
        this.floorRequestButtonList = []
        this.floorRequestList = []
        this.createFloorRequestButtons(_amountOfFloors)
    }

    createFloorRequestButtons(_amountOfFloors) {
        var buttonFloor = 1
        for (let i = 0; i < _amountOfFloors; i++) {
            var floorRequestButton = new FloorRequestButton(floorRequestButtonID, buttonFloor);
            this.floorRequestButtonList.push(floorRequestButton);
            buttonFloor++;
            floorRequestButtonID++;
        }   
    }

    //Simulate when a user press a button inside the elevator
    requestFloor(floor) {
        this.floorRequestList.push(floor);
        this.move();
        this.operateDoors();
        }

    move() {
        while (this.floorRequestList.length !== 0) {
            var destination = this.floorRequestList[0];
            this.status = "moving";
            if (this.currentFloor < destination) {
                this.direction = "up";
                this.sortFloorList();
                while (this.currentFloor < destination) {
                    this.currentFloor++;
                    this.screenDisplay = this.currentFloor;
                }
            } else if (this.currentFloor > destination) {
                this.direction = "down";
                this.sortFloorList();
                while (this.currentFloor > destination) {
                    this.currentFloor--;
                    this.screenDisplay = this.currentFloor;
                }
            }
            this.status = "stopped";
            this.floorRequestList.shift();
        }        
        this.status = "idle";
    }


    sortFloorList() {
        if (this.direction = "up") {
            this.floorRequestList.sort;
        } else{
            this.floorRequestList.reverse;
        }
    }

    operateDoors() {
        this.door.status = "opened";
        let obstruction;
        if (this !== "overweight") {
            this.door.status = "closing";
            if (obstruction = false) {
            this.door.status = "closed";
            } else {
                this.operateDoors;
            }
        } else {
            while (this.isOverweight) {
            }
            this.operateDoors;
        }
    }
}
    

class CallButton {
    constructor(_id, _floor, _direction) {
        this.ID = _id
        this.status = "OFF"
        this.floor = _floor
        this.direction = _direction
    }
}

class FloorRequestButton {
    constructor(_id, _floor) {
        this.ID = _id
        this.status = "OFF"
        this.floor = _floor
    }
}

class Door {
    constructor(_id) {
        this.ID = _id
        this.status = "closed"
    }
}

module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door }



// ******************

// To run your own simulation, uncomment the TEMPLATE section below and enter your own value in the different fields. 

// TEMPLATE - empty
// templateColumn = Column(1, <numberOfFloors>, <numberOfElevators>)
// templateColumn.elevatorList[0].currentFloor = <yourFirstElevatorCurrentFloor>
// templateColumn.elevatorList[1].currentFloor = <yourSecondElevatorCurrentFloor>
// elevator = templateColumn.requestElevator(<yourCurrentFloor>, "<yourRequestedDirection>")
// elevator.requestFloor(<yourRequestedFloorNumber>)

//  ******************
