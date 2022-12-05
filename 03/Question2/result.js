import { readFileSync } from "fs";

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  return arr;
};

const rucksackArray = syncReadFile("../input.txt");

let totalPriority = 0;
rucksackArray.pop();
let newArray = [];
const arrayLength = rucksackArray.length;
for (let arrIndex = 0; arrIndex < arrayLength; arrIndex = arrIndex + 3) {
  newArray.push([
    new Set(rucksackArray.pop()),
    new Set(rucksackArray.pop()),
    new Set(rucksackArray.pop()),
  ]);
}
for (const rucksacks of newArray) {
  const commonLetter = [
    ...new Set(
      [
        ...[...rucksacks[0]].filter((element) => rucksacks[1].has(element)),
      ].filter((element2) => rucksacks[2].has(element2))
    ),
  ][0];
  const charCode = commonLetter.charCodeAt(0);
  const priorityValue = charCode < 91 ? charCode - 38 : charCode - 96;
  totalPriority += priorityValue;
}
console.log({ totalPriority });
