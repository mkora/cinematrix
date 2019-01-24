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
import MovieContentList from './MovieContentList';
import PeopleContentList from './PeopleContentList'
import MovieContentForm from './MovieContentForm';

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
      <MovieContentList 
        isDialogOpen={this.state.isDialogOpen}
        onDialogSave={this.handleDialogSave}
        onDialogClose={this.handleDialogClose}      
      />
    ),
  },
  {
    key: 'add-movie',
    path: '/add-movie',
    component: () => (
      <div>
        <MovieContentForm
          isDialogOpen={this.state.isDialogOpen}
          onDialogSave={this.handleDialogSave}
          onDialogClose={this.handleDialogClose}
        />
      </div>
    ),
  },
  {
    key: 'actors',
    path: '/actors',
    component: () => (
      <PeopleContentList type="actor" />
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
      <PeopleContentList type="director" />
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

  state = {
    isDialogOpen: false,
    checkedId: null,    
  };

  handleEditClick = (id) => (e) => {
    this.setState({
      isDialogOpen: true,
      checkedId: id,
    });
  }

  handleDialogClose = () => {
    this.setState({
      iisDialogOpen: false,
      checkedId: null,
    });
  };

  handleDialogSave = (e) => {
    const id = this.state.checkedId;
    this.setState({
      isDialogOpen: false,
      checkedId: null,
    });
    console.log(e);
    console.log(`Save movie ${id}`);
  };

  render() {
    return (
      <Router>
        <div className={this.props.classes.root}>
          <AppDrawer toolbarTitle="Movies and TV Series" menuList={menu}>
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
