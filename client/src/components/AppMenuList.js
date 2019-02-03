import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// import { NavLink } from 'react-router-dom';
import Link from './ContentFormatLink';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nestedListItem: {
    paddingLeft: theme.spacing.unit * 5,
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  navLink: {
    textDecoration: 'inherit',
  },
  listItemTitle: {
    fontWeight: theme.typography.fontWeightMedium,
  }
});

class AppMenuList extends Component {
  state = {
    open: [true, true, true],
  };

  handleClick = (i) => (e) => {
    const open = this.state.open;
    open[i] = !open[i];
    this.setState({ open });
  };

  render() {
    const { classes, data } = this.props;
    const { open } = this.state;

    let tabIndex = 0;

    return (
      <div className={classes.root}>
        <List>
          {data.map((link, key) =>
            link.children === undefined ? (
                <Link
                  key={link.to}
                  to={`/${link.to}`}
                  activeClassName={classes.active}
                  className={classes.navLink}
                  exact
                  onClick={link.onClick}
                  >
                  <ListItem button>
                    <ListItemText
                      primary={link.title}
                      classes={{primary:classes.listItemTitle}}
                    />
                  </ListItem>
                </Link>
              ) : (
              <div key={`${link.to}${key}`}>
                <ListItem button onClick={this.handleClick(tabIndex)}>
                  <ListItemText
                    primary={link.title}
                    classes={{primary:classes.listItemTitle}}
                  />
                  {open[tabIndex] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open[tabIndex++]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {link.children.map((sublink) =>
                        <Link
                          key={sublink.to}
                          to={`/${sublink.to}`}
                          activeClassName={classes.active}
                          className={classes.navLink}
                          onClick={sublink.onClick}
                          exact>
                          <ListItem button className={classes.nestedListItem}>
                            <ListItemText primary={sublink.title} />
                          </ListItem>
                        </Link> 
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

AppMenuList.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(styles)(AppMenuList);
