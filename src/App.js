import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import Sidebar from './Sidebar/sidebar';
import Editor from './Editor/editor';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;

          return data;
        });
        console.log(notes);

        this.setState({
          notes
        });
      });
  }

  render() {
    const { selectedNoteIndex, notes } = this.state;

    return (
      <div className="app-container">
        <Sidebar
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        />
        {
          this.state.selectedNote ?
            <Editor
              selectedNote={this.state.selectedNote}
              selectedNoteIndex={selectedNoteIndex}
              notes={notes}
              noteUpdate={this.noteUpdate}
            /> :
            null
        }
      </div>
    );
  }



  selectNote = (note, index) => {
    this.setState({
      selectedNoteIndex: index,
      selectedNote: note
    });
  }
  noteUpdate = (id, noteObj) => {
    firebase
    .firestore()
    .collection('notes')
    .doc(id)
    .update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
  newNote = async (title) => {
    const note = {
      title,
      body: ''
    };

    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    
    const newID = newFromDB.id;
    const { notes } = this.state;

    await this.setState({
      notes: [...notes, note]
    });

    const newNote = notes.filter(note => note.id === newID);
    const newNoteIndex = notes.indexOf(newNote[0]);

    this.setState({
      selectedNote: notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex
    });
  }
  deselectNote = () => {
    this.setState({
      selectedNoteIndex: null,
      selectedNote: null
    });
  }
  deleteNote = async (note) => {
    await this.setState({
      notes: this.state.notes.filter(_note => _note !== note)
    });

    const { notes, selectedNoteIndex } = this.state;
    const noteIndex = notes.indexOf(note);

    if (selectedNoteIndex === noteIndex) {
      this.deselectNote();
    } else {
      console.log(selectedNoteIndex, notes);
      notes.length > 0 ?
      this.selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1) :
      this.deselectNote();
    }

    firebase
    .firestore()
    .collection('notes')
    .doc(note.id)
    .delete();
  }
}



export default App;
