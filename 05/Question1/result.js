import { readFileSync } from "fs";

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  return arr;
};

const fullArray = syncReadFile("../input.txt");

let rawBoxArray = [];
let gettingBoxes = true;
while (gettingBoxes) {
  const boxElement = fullArray.shift();
  if (boxElement !== "") {
    rawBoxArray.push(boxElement);
  } else {
    gettingBoxes = false;
  }
}

const boxStacks = Number(rawBoxArray.pop().slice(-2));
const boxArray = [];
for (let i = 0; i < boxStacks; i++) {
  boxArray.push([]);
}
const boxheight = rawBoxArray.length;
for (let stacks = boxheight - 1; stacks !== -1; stacks--) {
  const row = rawBoxArray[stacks];
  for (let bob = 0; bob < boxStacks; bob++) {
    const boxLoc = bob * 4;
    const box = row.slice(boxLoc + 1, boxLoc + 2);
    if (box !== " ") {
      boxArray[bob].push(box);
    }
  }
}
console.log({ boxArray });
console.log({ fullArray });

for (const moveCommand of fullArray) {
  if (moveCommand !== "") {
    const commandArray = moveCommand.split(" ");
    const toMove = Number(commandArray[1]);
    const fromStack = Number(commandArray[3]) - 1;
    const toStack = Number(commandArray[5]) - 1;
    console.log({ toMove }, { fromStack }, { toStack });

    for (let i = 0; i < toMove; i++) {
      const movingBox = boxArray[fromStack].pop();
      boxArray[toStack].push(movingBox);
    }
  }
}
console.log({ boxArray });

let codedMessage = "";
for (let i = 0; i < boxStacks; i++) {
  codedMessage += boxArray[i].pop();
}
console.log({ codedMessage });
