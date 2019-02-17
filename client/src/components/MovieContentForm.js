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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

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
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
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
    id:'',
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSave = e => {
    this.props.onDialogSave();
    const id = this.state.id;

    // Create object to save from this.state
    // Call api
  }

  componentDidMount() { // <--- different method not mount, but when?

    console.log('Our object ID: ' + this.props.clickedId);
    // Call api && fill out all the field in state + id

  }

  render() {
    const {
      fullScreenDialog,
      classes,
      isDialogOpen,
      onDialogClose,
    } = this.props;
    let dialogTop = (fullScreenDialog) ?
      (
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={onDialogClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Add movie
            </Typography>
            <Button color="inherit" onClick={this.handleSave}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
      ) : (
        <DialogTitle id="form-dialog-title">
          Edit movie
        </DialogTitle>
      );
    let dialogBottom = (fullScreenDialog) ?
      (
        <div></div>
      ) :
      (
        <DialogActions>
          <Button
            onClick={onDialogClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={this.handleSave}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      );

    return (
      <Dialog
        fullScreen={fullScreenDialog}
        open={isDialogOpen}
        onClose={onDialogClose}
        aria-labelledby="form-dialog-title"
      >
        { dialogTop }
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
        { dialogBottom }
      </Dialog>
    );
  }
}

MovieContentForm.propTypes = {
  fullScreenDialog: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  isDialogOpen: PropTypes.bool.isRequired,
  onDialogClose: PropTypes.func.isRequired,
  onDialogSave: PropTypes.func.isRequired,
  clickedId: PropTypes.string,
};

MovieContentForm.defaultProps = {
  fullScreenDialog: false
};

export default withStyles(styles)(MovieContentForm);
