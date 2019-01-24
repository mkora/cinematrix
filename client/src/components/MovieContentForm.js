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
import range from '../utils/range';

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

const currentYear = new Date().getFullYear();
const startYear = 1930;

class MovieContentForm extends Component {

  state = {
    title: '',
    alsoknown: '',
    country: '',
    year: currentYear,
    imdb: 7.0,
    episodes: 1,
    duration: 35,
    synopsis: '',
    source: '',
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      isDialogOpen,
      onDialogSave,
      onDialogClose,
    } = this.props;

    return (
      <Dialog
        open={isDialogOpen}
        onClose={onDialogClose}
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
              value={this.state.title}              
            />
            <TextField
              required
              id="movie-alsoknown"
              label="Also known"
              placeholder="Also known"
              multiline
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange('alsoknown')}
              value={this.state.alsoknown}              
            />            
            <TextField
              id="movie-county"
              select
              label="Country"
              className={classes.textField}
              InputProps={{
                menuprops: {
                  className: classes.menu,
                },
              }}
              margin="normal"
              onChange={this.handleChange('country')}
              value={this.state.country}
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
              onChange={this.handleChange('year')}
              value={this.state.year}
            >
              {range(startYear, currentYear).map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="movie-imdb"
              label="IMDB"
              type="number" // ?
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              onChange={this.handleChange('imdb')}
              value={this.state.imdb}                
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
              onChange={this.handleChange('duration')}
              value={this.state.duration}  
            />
            <TextField
              id="movie-episodes"
              label="Episodes"
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              onChange={this.handleChange('episodes')}
              value={this.state.episodes}  
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
              onChange={this.handleChange('synopsis')}
              value={this.state.synopsis}                
            />
            <TextField
              required
              id="movie-source"
              label="Credits"
              placeholder="Credits"
              multiline
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange('source')}
              value={this.state.source}                
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onDialogClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={onDialogSave}
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
  isDialogOpen: PropTypes.bool.isRequired,
  onDialogClose: PropTypes.func.isRequired,
  onDialogSave: PropTypes.func.isRequired,
};

export default withStyles(styles)(MovieContentForm);
