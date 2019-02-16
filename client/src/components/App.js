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

class App extends Component {

  state = {
    isDialogOpen: false, 
  };

  handleEditClick = (e) => {
    this.setState({
      isDialogOpen: true,
    });
  }

  handleDialogClose = (e) => {
    this.setState({
      isDialogOpen: false,
    });
  };

  handleDialogSave = (e) => {
    this.setState({
      isDialogOpen: false,
    });
  };

  render() {
    return (
      <Router>
        <div className={this.props.classes.root}>
          <AppDrawer
            toolbarTitle="Movies and TV Series"
            menuList={[
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
                    onClick: () => {
                      this.setState({
                        isDialogOpen: true,
                      });
                    }
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
            ]}>
            <Switch>
                <Route path="/" exact render={() => <div>TODO: Home component</div>} />
                <Route path='/movies' render={
                  () => (
                    <div>
                      <MovieContentList 
                        isDialogOpen={this.state.isDialogOpen}
                        onDialogSave={this.handleDialogSave.bind(this)}
                        onDialogClose={this.handleDialogClose.bind(this)}
                        onDialogEditClick={this.handleEditClick.bind(this)}
                      />
                    </div>
                  )} />
                <Route path='/add-movie' render={
                  () => (
                    <div>
                      <MovieContentForm
                        fullScreenDialog={true}
                        isDialogOpen={this.state.isDialogOpen}
                        onDialogSave={this.handleDialogSave.bind(this)}
                        onDialogClose={this.handleDialogClose.bind(this)}
                      />
                    </div>
                  )} />
                <Route path='/actors' render={() => (
                    <PeopleContentList type="actor" />
                  )} />
                <Route path='/add-actor' render={() => (
                    <div>TODO: Add add actor component</div>
                  )} />
                <Route path='/directors' render={() => (
                    <PeopleContentList type="director" />
                  )} />
                <Route path='/add-directors' render={() => (
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
