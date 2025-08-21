//console.log("\x1b[2J\x1b[0;0H"); //Clears terminal window
import { asyncWrapProviders } from "async_hooks";
import * as readline from "readline"

export type PlugBoard = Array<number>;
export type NumerisedString = Array<number>;
export type RotorHouse = Array<Rotor>;
type Reflector = Array<number>;
type RotorInternal = Array<number>;
type Rotor = [number, RotorInternal];
//Premade arrays for the machine
const rotor1: RotorInternal = [12, 3, 21, 0, 8, 25, 5, 19, 1, 14, 24, 7, 17, 23, 6, 20, 13, 2, 11, 4, 22, 10, 18, 15, 9, 16];
const rotor2: RotorInternal = [4, 16, 1, 23, 12, 9, 0, 18, 7, 25, 14, 3, 21, 10, 6, 20, 11, 2, 24, 15, 19, 5, 22, 13, 17, 8];
const rotor3: RotorInternal = [8, 22, 3, 19, 1, 11, 24, 0, 16, 7, 25, 14, 2, 18, 5, 21, 4, 10, 6, 23, 13, 15, 12, 20, 17, 9];
//TODO: remove this and have user configure rotor positions

//An array where the numbers are swapped in pairs meaning reflector[i] == y && reflector[y] == i
const reflector: Reflector = [17, 9, 5, 14, 23, 2, 24, 19, 21, 1, 15, 13, 22, 11, 3, 10, 18, 0, 16, 7, 25, 8, 12, 4, 6, 20];
const tempPlug: PlugBoard = [0, 9, 2, 3, 23, 5, 24, 19, 21, 1, 15, 13, 22, 11, 14, 10, 18, 17, 16, 7, 25, 8, 12, 4, 6, 20];


const zeroIndex: number = 97;

/**
 * Converts input to an array of each individual characters corresponding number (0-25)
 * @param inputString The string that should be converted
 * @returns Array of converted characters and null if failed (triggered by non letters being input)
 */
function stringToNumber(inputChar: string): number | null {
    let lowerCaseInput: string = inputChar.toLowerCase();

    if (!/^[a-z]+$/.test(lowerCaseInput)) {
        return null;
    }
        
    return lowerCaseInput.charCodeAt(0) - zeroIndex; // Returns the zero indexed numerised char
}

function numberToString(input: number): string {
    return String.fromCharCode(input + zeroIndex); // Returns the zero indexed numerised char
}

function mappingAction(map: Array<number>, input: number): number {
    return map[input];
}

//Only for abstraction in main function
function plugBoardAction(plugBoard: PlugBoard, input: number): number {
    return mappingAction(plugBoard, input);
}

function reflectorAction(reflector: Reflector, input: number): number {
    return mappingAction(reflector, input);
}

function rotorActionForward(rotor: Rotor, input: number): number {
    return mappingAction(rotor[1], input);
}

function rotorActionBackward(rotor: Rotor, input: number): number {
    return rotor[1].indexOf(input);
}


//Initialises the rotor house
function rotorHouseInit(): RotorHouse {
    return [[0, rotor1], [0, rotor2], [0, rotor3]];
}

//Helper func for rotorAction
function rotateRotor(rotor: Rotor, steps: number) {
    rotor[0] = (rotor[0] + steps) % 25;
    rotor[1] = rotor[1].slice(steps % 25).concat(rotor[1].slice(0, steps % 25));
}

//Routes the input through the 3 rotors, into the reflector then in reverse order back through said reflectors
function rotorReflectorRouting(rotorHouse: RotorHouse, input: number): number {
    let routeOutput: number = input;
    //First pass through rotor house
    routeOutput = rotorActionForward(rotorHouse[0], routeOutput);
    routeOutput = rotorActionForward(rotorHouse[1], routeOutput);
    routeOutput = rotorActionForward(rotorHouse[2], routeOutput);

    //goes through reflector
    routeOutput = reflectorAction(reflector, routeOutput);

    //Second pass through rotor house in oposite order
    routeOutput = rotorActionBackward(rotorHouse[2], routeOutput);
    routeOutput = rotorActionBackward(rotorHouse[1], routeOutput);
    routeOutput = rotorActionBackward(rotorHouse[0], routeOutput);

    return routeOutput;
}

//Rotates the rotors to their corresponding place and calls the routing function
function rotorReflectorAction(rotorHouse: RotorHouse, input: number): number {
    rotateRotor(rotorHouse[0], 1);
    if (rotorHouse[0][0] != 0) {
        return rotorReflectorRouting(rotorHouse, input);
    }
    rotateRotor(rotorHouse[1], 1);
    if (rotorHouse[1][0] != 0) {
        return rotorReflectorRouting(rotorHouse, input);
    }
    rotateRotor(rotorHouse[2], 1);
    return rotorReflectorRouting(rotorHouse, input);
}



function enigmaMain() {
    let rotorHouse: RotorHouse = rotorHouseInit();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question("Enter message\n", (answer) => { 
        console.log("Processing...");
        let answerNoSpaces = answer.replace(/\s+/g, "");
        let enigmaOutput: number | null;
        for (let i = 0; i < answerNoSpaces.length; i ++) {
            enigmaOutput = stringToNumber(answerNoSpaces[i]);
            if (enigmaOutput == null) {
               process.stdout.write(answerNoSpaces[i]);
               continue; 
            }
            enigmaOutput = plugBoardAction(tempPlug, enigmaOutput);
            enigmaOutput = rotorReflectorAction(rotorHouse, enigmaOutput);
            enigmaOutput = plugBoardAction(tempPlug, enigmaOutput);
            process.stdout.write(numberToString(enigmaOutput));
        }
        console.log("");
        rl.close();
    });
}

enigmaMain();



module.exports = { stringToNumber, plugBoardAction, rotorReflectorAction, rotorHouseInit };