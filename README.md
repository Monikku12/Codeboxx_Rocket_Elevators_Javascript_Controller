# Description

This program controls a Column of elevators.

It sends an elevator fetch a user when a button on a floor is press and it takes
this user to its desired floor when the corresponding button inside the elevator is pressed.

The program first creates the columns, elevators, buttons and other variables it needs to operate depending on the data you will input. From then, the program operates and controls the elevators in accordance of you scenario.

The elevator selection is based on a calculation determinating the best elevator possible. This calculation considers the status of the elevator, its position and its direction if it's moving.

# Dependencies

To be able to run the program, you need to have the Javascript language installed. 

# Usage

To use the program, you need to fill the TEMPLATE section at the bottom of the file. Fill the TEMPLATE by entering your own data by replacing the text with the <>. 

## Example

TEMPLATE - empty
var templateColumn = new Column(1, <numberOfFloors>, <numberOfElevators>);
templateColumn.elevatorList[0].currentFloor = <yourFirstElevatorCurrentFloor>;
templateColumn.elevatorList[1].currentFloor = <yourSecondElevatorCurrentFloor>;
var elevator = templateColumn.requestElevator(<yourCurrentFloor>, "<yourRequestedDirection>");
elevator.requestFloor(<yourRequestedFloorNumber>);

TEMPLATE - filled
var templateColumn = new Column(1, 10, 2);
templateColumn.elevatorList[0].currentFloor = 10;
templateColumn.elevatorList[1].currentFloor = 3;
var elevator = templateColumn.requestElevator(1, "up");
elevator.requestFloor(6);

Which means you have a building with one column of 2 elevators. The first elevator is on the 10th floor and the second elevator is on the third floor. Someone enters the building and press the button to call the elevator. In this case, the best elevator to reach the users will be the second elevator. The program will then operate the second elevator to pick up the users and bring him to the 6F like requested. 