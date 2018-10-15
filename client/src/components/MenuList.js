import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
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
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium * 1.5,
  },
  link: {
    textDecoration: 'inherit',
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium * 1.5,
  }
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

class MenuList extends Component {
  state = {
    open: [true, true, true],
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
        <List>
          {links.map((link, key) =>
            link.children === undefined ? (
                <NavLink
                  key={link.to}
                  to={`/${link.to}`}
                  activeClassName={classes.active}
                  className={classes.link}
                  exact
                  >
                  <ListItem button>
                    <ListItemText primary={link.title} className={classes.title} />
                  </ListItem>
                </NavLink>
              ) : (
              <div key={`${link.to}${key}`}>
                <ListItem button onClick={this.handleClick(tabIndex)}>
                  <ListItemText primary={link.title} className={classes.title} />
                  {open[tabIndex] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open[tabIndex++]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {link.children.map((sublink) =>
                        <NavLink
                          key={sublink.to}
                          to={`/${sublink.to}`}
                          activeClassName={classes.active}
                          className={classes.link}
                          exact>
                          <ListItem button className={classes.nested}>
                            <ListItemText primary={sublink.title} />
                          </ListItem>
                        </NavLink> 
                    )}
                  </List>
                </Collapse>
              </div>
            )
          )}
        </List>
      </div>
    );
  }
}

MenuList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuList);
