console.log("\x1b[2J\x1b[0;0H"); //Clears terminal window
export type PlugBoard = Array<number>;
export type NumerisedString = Array<number>;
type Reflector = Array<number>;
type Rotor = Array<number>;

const zeroIndex: number = 97;

/**
 * Converts input to an array of each individual characters corresponding number (0-25)
 * @param inputString The string that should be converted
 * @returns Array of converted characters and null if failed (triggered by non letters being input)
 */
function stringToNumbers(inputString: string): NumerisedString | null {
    let numberArray: Array<number> = new Array<number>();
    let lowerCaseInput: string = inputString.toLowerCase();

    if (!/^[a-z]+$/.test(lowerCaseInput)) {
        return null;
    }

    for (let i = 0; i < inputString.length; i++) {
        
        numberArray.push(lowerCaseInput.charCodeAt(i) - zeroIndex); // Pushes the zero indexed character/number to array
    }

    return numberArray;
}

//Helper func to plugBoardAction, checks if a input is connected in the plugboard
function checkArray(numberArray: Array<number>, inputNumber: number): number {
    return numberArray[inputNumber];
}


function plugBoardAction(plugBoard: PlugBoard, input: NumerisedString): NumerisedString {
    let returnString = new Array<number>(input.length);
    for (let i = 0; i < input.length; i++) {
        returnString[i] = checkArray(plugBoard, input[i]);
    }
    return returnString;
}


module.exports = { stringToNumbers, plugBoardAction };