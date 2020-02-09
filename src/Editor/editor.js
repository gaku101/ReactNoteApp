import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import _ from 'lodash';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      title: '',
      id: ''
    };
  }

  componentDidMount = () => {
    const { title, body, id } = this.props.selectedNote;

    this.setState({
      title,
      text: body,
      id
    });
  }

  componentDidUpdate = () => {
    if(this.props.selectedNote.id !== this.state.id) {
      this.setState({
        title: this.props.selectedNote.title,
        text: this.props.selectedNote.body,
        id: this.props.selectedNote.id
      });
    }
  }
  
  updateBody = async (val) => {
    await this.setState({
      text: val
    });
    this.update();
  };
  updateTitle = async (txt) => {
    await this.setState({
      title: txt
    });
    this.update();
  }
  update = _.debounce(() => {
    const { noteUpdate } = this.props;
    const { id, title, body } = this.state;
    const noteObj = {
      title,
      body: this.state.text
    };

    noteUpdate(id, noteObj);
  }, 1500);

  render() {
    const { classes } = this.props;

    return(
    <div className={classes.editorContainer}>
      <div className={classes.editorCOntainerHeader}>
        <BorderColorIcon className={classes.editIcon} />
        <input
          className={classes.titleInput}
          placeholder="ノートのタイトル"
          value={this.state.title ? this.state.title : ''}
          onChange={e => this.updateTitle(e.target.value)}
          />
      </div>
      <ReactQuill value={this.state.text} onChange={this.updateBody}/>
    </div>
    );
  }
}

export default withStyles(styles)(Editor);
