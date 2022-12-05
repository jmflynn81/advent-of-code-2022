import { readFileSync } from "fs";

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  return arr;
};

function getIntersection(setA, setB) {
  const intersection = new Set(
    [...setA].filter((element) => setB.has(element))
  );

  return intersection;
}

const rucksackArray = syncReadFile("../input.txt");

let totalPriority = 0;
for (const rucksack of rucksackArray) {
  const numberOfItemsInRucksack = rucksack.length;
  if (numberOfItemsInRucksack !== 0) {
    const sizeOfCompartment = numberOfItemsInRucksack / 2;
    const setA = rucksack.slice(0, sizeOfCompartment);
    const setB = rucksack.slice(sizeOfCompartment, numberOfItemsInRucksack);
    const commonLetter = [...getIntersection(new Set(setA), new Set(setB))][0];
    const charCode = commonLetter.charCodeAt(0);
    const priorityValue = charCode < 91 ? charCode - 38 : charCode - 96;
    totalPriority += priorityValue;
  }
}
console.log({ totalPriority });
