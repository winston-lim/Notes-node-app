const fs = require("fs");
const getNotes = function () {
  console.log("Notes...");
};
const addNote = function (title, body) {
  const data = loadNotes();
  //recall if no data exists yet, data =[]
  //if data exists, it will be Array<Object>
  data.push({
    title: title,
    body: body,
  });
  updateNotes(data);
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
const updateNotes = function(updatedNotes) {
  const dataString = JSON.stringify(updatedNotes);
  fs.writeFileSync('notes.json', dataString);
}
module.exports = {
  getNotes: getNotes,
  addNote: addNote,
};
