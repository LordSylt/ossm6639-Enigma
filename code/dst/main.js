"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("\x1b[2J\x1b[0;0H");
const zeroIndex = 97;
function stringToNumbers(inputString) {
    let numberArray = new Array();
    let lowerCaseInput = inputString.toLowerCase();
    if (!/^[a-z]+$/.test(lowerCaseInput)) {
        return null;
    }
    for (let i = 0; i < inputString.length; i++) {
        numberArray.push(lowerCaseInput.charCodeAt(i) - zeroIndex);
    }
    return numberArray;
}
function checkPlug(plugBoard, inputNumber) {
    for (let i = 0; i < plugBoard.length; i++) {
        if (inputNumber == plugBoard[i][0]) {
            return plugBoard[i][1];
        }
        else if (inputNumber == plugBoard[i][1]) {
            return plugBoard[i][0];
        }
    }
    return inputNumber;
}
function plugBoardAction(plugBoard, input) {
    let returnString = new Array(input.length);
    for (let i = 0; i < input.length; i++) {
        returnString[i] = checkPlug(plugBoard, input[i]);
    }
    return returnString;
}
module.exports = { stringToNumbers, plugBoardAction };
//# sourceMappingURL=main.js.map