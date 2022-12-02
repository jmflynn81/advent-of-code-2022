import { readFileSync } from "fs";

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  return arr;
};

const arr = syncReadFile("../input.txt");
let currentElf = 1;
let topElf = 0;
let maxCalorie = 0;
let currentCaloire = 0;
for (const calorieValue of arr) {
  if (calorieValue !== "") {
    currentCaloire += Number(calorieValue);
  } else {
    if (currentCaloire > maxCalorie) {
      maxCalorie = currentCaloire;
      topElf = currentElf;
    }
    currentCaloire = 0;
    currentElf += 1;
  }
}

console.log({ topElf }, { maxCalorie }, { currentElf });
