const fs = require("fs");
const chalk = require('chalk');
const getNotes = function () {
  console.log("Notes...");
};
const addNote = function (title, body) {
  const data = loadNotes();
  //recall if no data exists yet, data =[]
  //if data exists, it will be Array<Object>

  //to prevent duplicate titles, if title already exists, add it to a duplicateNotes array
  const duplicateNotes = data.filter((note)=>note.title === title);
  if (duplicateNotes.length >0) {
    console.log(chalk.red.inverse('title taken'));
    return;
  }
  data.push({
    title: title,
    body: body,
  });
  updateNotes(data);
  console.log(chalk.green.inverse(`${title} added!`));
};
const removeNote = function(title) {
  const data = loadNotes();
  const notesToKeep = data.filter((note)=>note.title!==title);
  if (notesToKeep.length === data.length ) {
    console.log(chalk.red.inverse('No such title'));
    return;
  }
  updateNotes(notesToKeep);
  console.log(chalk.green.inverse(`${title} was removed!`));
}


const loadNotes = function () {
  try {
    //data is a buffer as the return value is in binary, not a string
    const dataBuffer = fs.readFileSync("notes.json");
    //dataBuffer.toString() converts it from binary representation to a string
    const dataJSON = JSON.parse(dataBuffer.toString());
    return dataJSON;
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
  removeNote: removeNote,
};
