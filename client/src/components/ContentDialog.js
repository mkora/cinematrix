import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class ContentDialog extends React.Component {
  render() {
    const {
      title,
      open,
      onSave,
      onClose,
      children,
    } = this.props;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
} 

// props

export default ContentDialog;
