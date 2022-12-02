import { readFileSync } from "fs";

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  return arr;
};

const arr = syncReadFile("../input.txt");
let currentElf = 1;
let currentCaloire = 0;
let elfArray = [];
for (const calorieValue of arr) {
  if (calorieValue !== "") {
    currentCaloire += Number(calorieValue);
  } else {
    elfArray.push(currentCaloire);
    currentCaloire = 0;
    currentElf += 1;
  }
}
elfArray.sort();
const topNumbers = 3;
let maxCalorie = 0;
for (let arrIndex = 0; arrIndex < topNumbers; arrIndex++) {
  maxCalorie += elfArray.pop();
}
console.log({ maxCalorie });
