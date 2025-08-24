const main = require("../main")

//Unit tests for stringToNumbers
function testStringToNumbers() {
    let testString: string = "abcdef"
    let numerisedOutput: Array<number> = new Array<number>();
    for (let i = 0; i < testString.length; i++) {
        numerisedOutput[i] = main.stringToNumber(testString[i])
    }
    expect(numerisedOutput).toEqual([0, 1, 2, 3, 4, 5]);
}

function testStringToNumbersCapital() {
    let testString: string = "aBcDef"
    let numerisedOutput: Array<number> = new Array<number>();
    for (let i = 0; i < testString.length; i++) {
        numerisedOutput[i] = main.stringToNumber(testString[i])
    }
    expect(numerisedOutput).toEqual([0, 1, 2, 3, 4, 5]);
}

function testStringToNumbersError() {
    let testString: string = "1"
    expect(main.stringToNumber(testString)).toBe(null);
}



//Unit tests for numbersToString
function testNumbersToString() {
    let outputString: string = "";
    let numerisedInput: Array<number> = [0, 1, 2, 3, 4, 5];
    for (let i = 0; i < numerisedInput.length; i++) {
        outputString = outputString + main.numberToString(numerisedInput[i])
    }
    expect(outputString).toEqual("abcdef");
}



//Unit tests for plugBoardAction
function testPlugBoardNoPlugs() {
    let plugBoard = new Array<number>();
    for (let i = 0; i < 26; i++) {
        plugBoard[i] = i;
    } 
    let numerisedString: Array<number> = [0, 1, 2, 3];
    let plugBoardOutput: Array<number> = new Array<number>();
    for (let i = 0; i < numerisedString.length; i++) {
        plugBoardOutput[i] = main.plugBoardAction(plugBoard, numerisedString[i])
    }
    expect(plugBoardOutput).toEqual([0, 1, 2, 3]);
}

function testPlugBoardPlugs() {
    let plugBoard: Array<number> = [1, 0, 3, 2];
    for (let i = 4; i < 26; i++) {
        plugBoard[i] = i;
    } 
    let numerisedString: Array<number> = [0, 1, 2, 3, 4];
    let plugBoardOutput: Array<number> = new Array<number>();
    for (let i = 0; i < numerisedString.length; i++) {
        plugBoardOutput[i] = main.plugBoardAction(plugBoard, numerisedString[i])
    }
    expect(plugBoardOutput).toEqual([1, 0, 3, 2, 4]);
}


function testRotorReflectorSymmetry() {
    let numerisedString: Array<number> = [0, 1, 2, 3];
    let rotorOutput: Array<number> = new Array<number>();
    let rotorHouse1 = main.rotorHouseInit();
    let rotorHouse2 = main.rotorHouseInit();
    for (let i = 0; i < numerisedString.length; i++) {
        rotorOutput[i] = main.rotorReflectorAction(rotorHouse1, numerisedString[i]);
    }
    expect(rotorOutput).not.toEqual(numerisedString);
    for (let i = 0; i < numerisedString.length; i++) {
        rotorOutput[i] = main.rotorReflectorAction(rotorHouse2, rotorOutput[i]);
    }
    expect(rotorOutput).toEqual(numerisedString);
}


//Unit tests for rotateRotor func
function testRotateForwardAndBackward() {
    let testRotorHouse = main.rotorHouseInit();
    main.rotateRotor(testRotorHouse[0], 10);
    expect(testRotorHouse[0][0]).toBe(10);
    expect(testRotorHouse[0][1][0]).toBe(24);
    main.rotateRotor(testRotorHouse[0], 20);
    expect(testRotorHouse[0][0]).toBe(4);
    expect(testRotorHouse[0][1][0]).toBe(8);
}


//Running tests
test("Converts a string into its letters corresponding zero-indexed numbers", testStringToNumbers);
test("Converts a Capitalized string into its letters corresponding zero-indexed numbers", testStringToNumbersCapital);
test("Tests a negative output from stringToNumbers", testStringToNumbersError);
test("Converts a zero-indexed number into its corresponding alhpabetical letter", testNumbersToString);
test("Tests the plugboard with an empty plugboard", testPlugBoardNoPlugs);
test("Tests the plugboard with an non-empty plugboard", testPlugBoardPlugs);
test("Test to see if rotor and reflector actions are symmetrical", testRotorReflectorSymmetry);
test("Tests rotation of arrays (rotors)", testRotateForwardAndBackward);