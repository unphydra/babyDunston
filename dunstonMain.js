const lib = require('./src/lib.js');

const list = [
  [10,"start"],
  [20,"mov","a,3"],
  [30,"mov","b,10"],
  [40,"mov","c,3"],
  [50,"mov","d,6"],
  [60,"add","a,3"],
  [70,"cmp","a,b"],
  [80,"jge","100"],
  [90,"jmp","60"],
  [100,"prn","a"],
  [110,"stop"]
];

const prnArray = lib.callDunstonFunction(list);
console.log(prnArray);

