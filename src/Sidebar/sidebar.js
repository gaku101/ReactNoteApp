import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItem from '../SidebarItem/sidebarItem';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addingNote: false,
      title: null
    };
  }

  render() {
    const { classes, notes, selectedNoteIndex } = this.props;
    const { addingNote } = this.state;

    if (notes) {
      return (
        <div className={classes.sidebarContainer}>
          <div className={classes.sidebarTitle}>ノート一覧</div>
          <List>
            {
              notes.map((note, index) => {
                return (
                  <div key={index}>
                    <SidebarItem
                      note={note}
                      index={index}
                      selectedNoteIndex={selectedNoteIndex}
                      selectNote={this.selectNote}
                      deleteNote={this.deleteNote}
                    >
                      <Divider />
                    </SidebarItem>
                  </div>
                )
              })
            }
          </List>
          {
            addingNote ?
              (
                <div>
                  <span className={classes.newNoteBorder} />
                  <input type="text"
                    className={classes.newNoteInput}
                    placeholder="ノートのタイトルを入力してください"
                    onKeyUp={e => this.updateTitle(e.target.value)}
                  />
                  <Button
                    className={classes.newNoteSubmitBtn}
                    onClick={this.newNote}
                  >
                    ノートを作成する
                </Button>
                </div>
              ) :
              null
          }
          <span className={classes.newNoteBorder} />
          <Button
            onClick={this.newNoteBtnClick}
            className={classes.newNoteBtn}
          >
            {/* <AddBoxOutlinewdIcon className={classes.newNoteBtnIcon} /> */}
            {addingNote ? 'キャンセル' : '新規ノート作成'}
          </Button>
        </div>
      )
    } else {
      return <div></div>;
    }
  }


  newNoteBtnClick = () => {
    const { addingNote } = this.state;

    this.setState({
      addingNote: !addingNote,
      title: null,
    });
  }
  updateTitle = txt => {
    this.setState({
      title: txt
    });
  }
  newNote = () => {
    const { newNote } = this.props;
    const { title } = this.state;

    newNote(title);
    this.setState({
      title: null,
      addingNote: false
    });
  }
  selectNote = (note, index) => this.props.selectNote(note, index);

  deleteNote = note => {
    const { deleteNote } = this.props;

    deleteNote(note);
  }
}

export default withStyles(styles)(Sidebar);