const addTwoReg = function(reg1, reg2) {
  return reg1 + reg2;
};

const subTwoReg = function(reg1, reg2) {
  return reg1 - reg2;
};

const movValToReg = function(reg1, reg2) {
  return reg2;
};

const cmpAction = function(reg1, reg2) {
  let result = [0, 0, 0, 0];
  if (reg1 == reg2) {
    result.splice(0, 1, 1);
  }
  if (reg1 != reg2) {
    result.splice(1, 1, 1);
  }
  if (reg1 > reg2) {
    result.splice(2, 1, 1);
  }
  if (reg1 < reg2) {
    result.splice(3, 1, 1);
  }
  return result;
};

const jumpAction = function(reg1, reg2) {
  return reg2 / 10 - 2;
};

const prnReg = function(prnArray, reg) {
  let index = prnArray[0].indexOf(reg);
  let num = prnArray[1][index];
  let newPrnArray = prnArray.slice();
  newPrnArray[5].splice(0, 1, num);
  return newPrnArray;
};

const getNumber = function(instArray, groups) {
  let stringArray = ["a", "b", "c", "d"];
  let length = instArray.length;
  if (stringArray.includes(instArray[1])) {
    let index = groups[0].indexOf(instArray[1]);
    return groups[1][index];
  }
  return eval(instArray[length - 1]);
};

const getInst = function(lineArray) {
  return lineArray[2].split(",");
};

const reducer = function(groups, lineArr, lineNum) {
  let action = "";
  let newGroups = [];
  if (lineArr.includes("add")) {
    console.log(".....add....");
    action = actionFunction(addTwoReg);
    newGroups = action(groups, lineArr);
    return newGroups;
  }
  if (lineArr.includes("sub")) {
    console.log(".....sub.....");
    action = actionFunction(subTwoReg);
    newGroups = action(groups, lineArr);
    return newGroups;
  }
  if (lineArr.includes("mov")) {
    console.log(".....mov.....");
    action = actionFunction(movValToReg);
    newGroups = action(groups, lineArr);
    return newGroups;
  }
  if (lineArr.includes("prn")) {
    console.log(".....prn.....");
    let reg = lineArr[2];
    newGroups = prnReg(groups, reg);
    return newGroups;
  }
  if (lineArr.includes("cmp")) {
    console.log(".....cmp....");
    action = actionFunction(cmpAction);
    newGroups = action(groups, lineArr);
    return newGroups;
  }
  if (lineArr.includes("jlt") && groups[3][3] == 1) {
    console.log(".....jlt....");
    action = actionFunction(jumpAction);
    newGroups = action(groups, lineArr, lineNum);
    return newGroups;
  }
  if (lineArr.includes("jgt") && groups[3][2] == 1) {
    console.log(".....jgt....");
    action = actionFunction(jumpAction);
    newGroups = action(groups, lineArr, lineNum);
    return newGroups;
  }
  if (lineArr.includes("jne") && groups[3][1] == 1) {
    console.log(".....jne.....");
    action = actionFunction(jumpAction);
    newGroups = action(groups, lineArr, lineNum);
    return newGroups;
  }
  if (lineArr.includes("je") && groups[3][0] == 1) {
    console.log(".....je.....");
    action = actionFunction(jumpAction);
    newGroups = action(groups, lineArr, lineNum);
    return newGroups;
  }
  if (lineArr.includes("jge") && (groups[3][2] == 1 || groups[3][0] == 1)) {
    console.log(".....jge.....");
    action = actionFunction(jumpAction);
    newGroups = action(groups, lineArr, lineNum);
    return newGroups;
  }
  if (lineArr.includes("jle") && (groups[3][3] == 1 || groups[3][0] == 1)) {
    console.log(".....jle.....");
    action = actionFunction(jumpAction);
    newGroups = action(groups, lineArr, lineNum);
    return newGroups;
  }
  if (lineArr.includes("jmp")) {
    console.log(".....jmp.....");
    action = actionFunction(jumpAction);
    newGroups = action(groups, lineArr, lineNum);
    return newGroups;
  }
  return groups;
};

const actionFunction = function(action) {
  return function(groups, lineArr, lineNum) {
    let stringArr = ["jmp", "jlt", "jgt", "je", "jne", "jle", "jge"];
    let newGroups = groups.slice();
    let instArr = getInst(lineArr);
    let index = newGroups[0].indexOf(instArr[0]);
    let reg1 = newGroups[1][index];
    let reg2 = getNumber(instArr, newGroups);
    let newReg = action(reg1, reg2);
    if (action == cmpAction) {
      newGroups.splice(3, 1, newReg);
      return newGroups;
    }
    if (stringArr.includes(lineArr[1])) {
      newGroups.push(newReg);
      return newGroups;
    }
    newGroups[1].splice(index, 1, newReg);
    return newGroups;
  };
};

const callDunstonFunction = function(list) {
  let visiableList = [
    ["a", "b", "c", "d"],
    [0, 0, 0, 0],
    ["EQ", "NE", "GT", "LT"],
    [0, 0, 0, 0],
    ["prn"],
    [0]
  ];
  for (let i = 0; i < list.length; i++) {
    visiableList = reducer(visiableList, list[i], i);
    if (visiableList[6] != undefined) {
      i = visiableList[6];
    }
    visiableList = visiableList.slice(0, 6);
  }
  let prnList = visiableList.join("\n");
  return prnList;
};

exports.callDunstonFunction = callDunstonFunction;
