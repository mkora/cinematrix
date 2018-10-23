import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentList from './ContentList';

class MovieContentList extends Component {
  state = {
    data: [
      {
        summary: 'Movie title 1, year', // Actor full name
        mainDetails: 'eq pic || duration & number of episodes #1,country', // Actor pic || additial info
        secondaryDetails: 'Movie synopsis 1', // Actor bio
        editAction: 'movie-edit/1',
        deleteAction: 'movie-edit/1',
      },
      {
        summary: 'Movie title 2, year', // Actor full name
        mainDetails: 'eq pic || duration & number of episodes #2, country', // Actor pic || additial info
        secondaryDetails: 'Movie synopsis 2', // Actor bio
        editAction: 'movie-edit/2',
        deleteAction: 'movie-edit/2',
      },
      {
        summary: 'Movie title 3, year', // Actor full name
        mainDetails: 'eq pic || duration & number of episodes #3, country', // Actor pic || additial info
        secondaryDetails: 'Movie synopsis 3', // Actor bio
        editAction: 'movie-edit/3',
        deleteAction: 'movie-edit/3',
      },
      ],
  };

  render() {
    const {
      data,
    }  = this.state;
    return (
      <ContentList data={data} />
    );
  }
}

ContentList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default MovieContentList;
