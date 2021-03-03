const fs = require("fs");
const chalk = require('chalk');


const addNote = (title, body) => {
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
const removeNote = (title) => {
  const data = loadNotes();
  const notesToKeep = data.filter((note)=>note.title!==title);
  if (notesToKeep.length === data.length ) {
    console.log(chalk.red.inverse('No such title'));
    return;
  }
  updateNotes(notesToKeep);
  console.log(chalk.green.inverse(`${title} was removed!`));
}
const listNotes = () => {
  const data = loadNotes();
  console.log(chalk.cyan.inverse('Your Notes:'));
  if (data.length ===0) {
    console.log(chalk.red.inverse('No notes yet!'));
    return;
  }
  data.forEach(element =>console.log(chalk.green.inverse(`  ${element.title}  `)));
}
const readNote = (title) => {
  const data = loadNotes();
  const searchResult = data.find((note)=>note.title === title);
  if (searchResult === undefined) {
    console.log(chalk.red.inverse('No such title!'));
    return;
  }
  console.log(chalk.cyan.inverse(`  ${searchResult.title}  `));
  console.log(chalk.green.inverse(`  ${searchResult.body}  `));
}


const loadNotes = () => {
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
const updateNotes = (updatedNotes) => {
  const dataString = JSON.stringify(updatedNotes);
  fs.writeFileSync('notes.json', dataString);
}


module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
