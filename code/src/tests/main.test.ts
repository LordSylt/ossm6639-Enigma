const main = require("../main")

//Unit tests for stringToNumbers
function testStringToNumbers() {
    expect(main.stringToNumbers("abcdef")).toEqual([0, 1, 2, 3, 4, 5]);
}

function testStringToNumbersCapital() {
    expect(main.stringToNumbers("aBcDef")).toEqual([0, 1, 2, 3, 4, 5]);
}

function testStringToNumbersError() {
    expect(main.stringToNumbers("abcde1")).toBe(null);
}



//Unit tests for plugBoardAction
function testPlugBoardNoPlugs() {
    let plugBoard = new Array<number>();
    for (let i = 0; i < 26; i++) {
        plugBoard[i] = i;
    } 
    expect(main.plugBoardAction(plugBoard, [0, 1, 2, 3])).toEqual([0, 1, 2, 3]);
}

function testPlugBoardPlugs() {
    let plugBoard: Array<number> = [1, 0, 3, 2];
    for (let i = 4; i < 26; i++) {
        plugBoard[i] = i;
    } 
    expect(main.plugBoardAction(plugBoard, [0, 1, 2, 3, 4])).toEqual([1, 0, 3, 2, 4]);
}


//Running tests
test("Converts a string into its letters corresponding zero-indexed numbers", testStringToNumbers);
test("Converts a Capitalized string into its letters corresponding zero-indexed numbers", testStringToNumbersCapital);
test("Tests a negative output from stringToNumbers", testStringToNumbersError);
test("Tests the plugboard with an empty plugboard", testPlugBoardNoPlugs);
test("Tests the plugboard with an non-empty plugboard", testPlugBoardPlugs);