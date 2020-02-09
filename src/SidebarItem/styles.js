const styles = theme => ({
  listItem: {
    cursor: 'pointer',
    color:'#d0cecb'
  },
  textSection: {
    maxWidth: '85%'
  },
  deleteIcon: {
    position: 'absolute',
    right: '5px',
    top: 'calc(50% - 15px)',
    color:'#b6b3b3',
    '&:hover': {
      color: '#f0a27b'
    }
  }
});

export default styles;