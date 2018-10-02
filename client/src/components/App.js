import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withRoot from '../withRoot';
import AppDrawer from './AppDrawer';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppDrawer title="Something in here. Does it change?">
          <Typography noWrap>{'Something in here too. Actually, not just something, but something special.'}</Typography>
        </AppDrawer>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
