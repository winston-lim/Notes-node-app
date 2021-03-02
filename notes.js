const fs = require('fs');
const getNotes = function() {
  console.log('Notes...')
}
const loadNotes = function() {
  //data is a buffer as the return value is in binary, not a string
  const dataBuffer = fs.readFileSync('notes.json');
  //dataBuffer.toString() converts it from binary representation to a string
  const dataJSON = JSON.parse(dataBuffer.toString());
}


module.exports = {
  getNotes: getNotes,
}