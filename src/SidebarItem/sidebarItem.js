import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';

class SidebarItem extends Component {
  constructor(props) {
    super(props);
  }

  deleteNote = note => {
    const isConfirmed = window.confirm(`ノートを削除してもよろしいですか？ : ${note.title}`);

    if (isConfirmed) {
      this.props.deleteNote(note);
    }
  }

  render() {
    const { index, note, classes, selectNote, selectedNoteIndex } = this.props;

    return (
      <ListItem
        className={classes.listItem}
        selected={selectedNoteIndex === index}
        alignItems="flex-start"
      >
        <div
          className={classes.textSection}
          onClick={() => selectNote(note, index)}
        >
          <ListItemText
            primary={note.title}
            secondary={removeHTMLTags(`${note.body.substring(0,30)}...`)}
          />
        </div>
        <DeleteIcon
          onClick={() => this.deleteNote(note)}
          className={classes.deleteIcon}
          />
      </ListItem>
    );
  }
}

export default withStyles(styles)(SidebarItem);