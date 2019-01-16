import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { movies } from  '../api';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

const countries = [
  {
    value: 'USA',
    label: 'United States of America',
  },
  {
    value: 'China',
    label: 'China',
  },
  {
    value: 'Korea',
    label: 'South Korea',
  },
  {
    value: 'Japan',
    label: 'Japan',
  },
  {
    value: 'Taiwan',
    label: 'Taiwan',
  },
  {
    value: 'Thailand',
    label: 'Thailand',
  },
];

class MovieContentForm extends Component {

  state = {
    title: '',
    // etc
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      open,
      onSave,
      onClose,
    } = this.props;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Edit Movie
        </DialogTitle>
        <DialogContent>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              required
              id="movie-title"
              label="Title"
              placeholder="Title"
              multiline
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange('title')}
            />
            <TextField
              required
              id="country-title"
              label="Country"
              className={classes.textField}
              margin="normal"
            />
            <TextField
              id="movie-county"
              select
              label="Country"
              className={classes.textField}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Country"
              margin="normal"
            >
              {countries.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="movie-year"
              select
              label="Year"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              helperText="Year"
              margin="normal"
              // start from ?
              // end ?
            />
            <TextField
              id="movie-imdb"
              label="IMDB"
              type="number" // ?
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <TextField
              id="movie-duration"
              label="Duration"
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <TextField
              id="movie-synopsis"
              label="Synopsis"
              placeholder="Synopsis"
              multiline
              className={classes.textField}
              margin="normal"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              id="movie-source"
              label="Credits"
              placeholder="Credits"
              multiline
              className={classes.textField}
              margin="normal"
            />
          </form>
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

MovieContentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default withStyles(styles)(MovieContentForm);
