import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import withRoot from '../withRoot';
import AppDrawer from './AppDrawer';

const styles = theme => ({
  root: {

  },
});

const menu = [
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

const routes = [
  {
    key: 'home',
    path: '/',
    exact: true,
    component: () => (
      <div>TODO: Home component</div>
    ),
  },
  {
    key: 'movies',
    path: '/movies',
    component: () => (
      <div>TODO: Add all movies component</div>
    ),
  },
  {
    key: 'add-movie',
    path: '/add-movie',
    component: () => (
      <div>TODO: Add add movie component</div>
    ),
  },
  {
    key: 'actors',
    path: '/actors',
    component: () => (
      <div>TODO: Add all actors component</div>
    ),
  },
  {
    key: 'add-actor',
    path: '/add-actor',
    component: () => (
      <div>TODO: Add add actor component</div>
    ),
  },
  {
    key: 'directors',
    path: '/directors',
    component: () => (
      <div>TODO: Add all directors component</div>
    ),
  },
  {
    key: 'add-director',
    path: '/add-directors',
    component: () => (
      <div>TODO: Add add directors component</div>
    ),
  },
];

class App extends Component {
  render() {
    return (
      <Router>
        <div className={this.props.classes.root}>
          <AppDrawer toolbarTitle="Movies and TV Shows" menuList={menu}>
            <Switch>
              {routes.map((route) =>
                <Route {...route} />
              )}
            </Switch>
          </AppDrawer>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
