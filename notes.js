const fs = require("fs");
const getNotes = function () {
  console.log("Notes...");
};
const loadNotes = function () {
  try {
    //data is a buffer as the return value is in binary, not a string
    const dataBuffer = fs.readFileSync("notes.json");
    //dataBuffer.toString() converts it from binary representation to a string
    const dataJSON = JSON.parse(dataBuffer.toString());
  } catch (err) {
    //if notes.json does not exist, create an array to store in our file
    return [];
  }
};
module.exports = {
  getNotes: getNotes,
};
