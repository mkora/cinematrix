import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NestedList extends Component {
  state = {
    open: [true, true],
  };

  handleClick = (i) => (e) => {
    const open = this.state.open;
    open[i] = !open[i];
    this.setState({ open });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          <ListItem button>
            { /* <ListItemIcon> */ }
              { /*add icon image here or remove a parent too */ }
            { /* </ListItemIcon> */ }
            <ListItemText inset primary="Item One" />
          </ListItem>

          <ListItem button onClick={this.handleClick(0)}>
            <ListItemText inset primary="Item Two: Parent" />
            {this.state.open[0] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={this.state.open[0]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Item Two: Child One" />
              </ListItem>
            </List>
          </Collapse>
        </List>

        <Divider />

        <List>

          <ListItem button onClick={this.handleClick(1)}>
            <ListItemText inset primary="Item One: Parent" />
            {this.state.open[1] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={this.state.open[1]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Item One: Child One" />
              </ListItem>
            </List>
          </Collapse>
        </List>        
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);
