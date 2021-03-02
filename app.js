const chalk = require('chalk');
const yargs = require('yargs');
const fs = require('fs');
const notesUtil = require('./notes.js');

//creating all commands
yargs.command({
	command: 'add',
	describe: 'add a new note',
  //setting options
  builder: {
    //add title option
    title: {
      //description
      describe: 'Note title',
      //making option required,
      demandOption: true,
      //making accepted value string type
      type: 'string',
    },
    body: {
      //description
      describe: 'Note title',
      //making option required,
      demandOption: true,
      //making accepted value string type
      type: 'string',
    },
  },
  //options will be in argv object, which can be accepted by handler
	handler: (argv) =>{
    notesUtil.addNote(argv.title, argv.body);
  }}).command({
    command: 'remove',
    describe: 'remove an existing note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string',
      },
    },
    handler: (argv) =>{
      notesUtil.removeNote(argv.title);
    }}).command({
      command: 'List',
      describe: 'List all existing notes',
      handler: () =>{
      }}).command({
        command: 'read',
        describe: 'read a exisiting note',
        builder: {
          title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
          },
        },
        handler: () =>{
        }}).argv
