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
                <Route key="home" path="/" exact component={<div>TODO: Home component</div>} />
                <Route key='movies' path='/movies' render={
                  (props) => (
                    <div>
                      <MovieContentList 
                        isDialogOpen={true}
                        onDialogSave={props.handleDialogSave}
                        onDialogClose={props.handleDialogClose}      
                      />
                    </div>
                  )} />
                <Route key='add-movie' path='/add-movie' render={(props) => (
                    <div>
                      <MovieContentForm
                        isDialogOpen={true}
                        onDialogSave={props.handleDialogSave}
                        onDialogClose={props.handleDialogClose}
                      />
                    </div>
                  )} />
                <Route key='actors' path='/actors' component={() => (
                    <PeopleContentList type="actor" />
                  )} />
                <Route key='add-actor' path='/add-actor' component={() => (
                    <div>TODO: Add add actor component</div>
                  )} />
                <Route key='directors' path='/directors' component={() => (
                    <PeopleContentList type="director" />
                  )} />
                <Route key='add-director' path='/add-directors' component={() => (
                    <div>TODO: Add add directors component</div>
                  )} />
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
