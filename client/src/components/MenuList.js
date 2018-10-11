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
import { NavLink } from 'react-router-dom';

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

const links = [
  {
    to: '',
    title: 'Home',
  },
  {
    title: 'Movies',
    children: [
      {
        to: 'movies',
        title: 'All movies',
      },
      {
        to: 'add-movie',
        title: 'Add movie',
      },      
    ]
  },
  {
    title: 'Actors',
    children: [
      {
        to: 'actors',
        title: 'All actors',
      },
      {
        to: 'add-movie',
        title: 'Add actor',
      },      
    ]
  },
  {
    title: 'Directors',
    children: [
      {
        to: 'directors',
        title: 'All directors',
      },
      {
        to: 'add-director',
        title: 'Add director',
      },      
    ]
  },
   
];

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
    const { open } = this.state;

    let tabIndex = 0;

    return (
      <div className={classes.root}>
        {links.map((link) =>
          <List key={link.to}>

            {link.children === undefined &&
              <ListItem button>
                { /* <ListItemIcon> */ }
                  { /*add icon image here or remove a parent too */ }
                { /* </ListItemIcon> */ }
                { /* <ListItemText inset primary={link.title} /> */ }
                <NavLink 
                  to={`/${link.to}`} 
                  activeClassName="active"
                  exact>
                  {link.title}
                </NavLink>
              </ListItem>
            }

            {link.children !== undefined &&
              <div>
                <ListItem button onClick={this.handleClick(tabIndex)}>
                  <ListItemText inset primary={link.title} />
                  {open[tabIndex] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open[tabIndex++]} timeout="auto" unmountOnExit>
                {link.children.map((sublink) =>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                      { /* <ListItemText inset primary={sublink.title} /> */ }
                      <NavLink 
                        to={`/${sublink.to}`} 
                        activeClassName="active"
                        exact>
                        {sublink.title}
                      </NavLink>                      
                    </ListItem>
                  </List>
                )}
                </Collapse>
              </div>
            }
          </List>
        )}

        <Divider />
        
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);
