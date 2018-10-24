import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentList from './ContentList';
import { movies } from  '../api';

class MovieContentList extends Component {
  state = {
    data: [],
    isError: false, // SnackBars with messages -> but I don't want it here
    isLoading: false, // CircularProgress -> but I don't want it here
  };

  async componentDidMount() {
    try {
      const data = await movies();
      if(data.success) {
        /**
         * TODO: parse data as:
            {
              summary: 'Movie title 1, year', // Actor full name
              mainDetails: 'eq pic || duration & number of episodes #1,country', // Actor pic || additial info
              secondaryDetails: 'Movie synopsis 1', // Actor bio
              editAction: 'movie-edit/1',
              deleteAction: 'movie-edit/1',
            },
         *
         *
         */
        this.setState({
          data,
          isError: false,
          isLoading: false,
        });
      } else {
        this.setState({
          isError: true,
          isLoading: false,
        });
        console.log(data.error);
      }
    } catch (err) {
      this.setState({
        isError: true,
        isLoading: false,
      });
      console.log(err);
    }
  }

  render() {
    const {
      data,
      isLoading,
      isError
    }  = this.state;

    if (isLoading) {
      return (
        <div>LOADING...</div>
      );
    }

    if (isError) {
      return (
        <div>ERROR... Check out console.log</div>
      );
    }

    return (
      <ContentList data={data} />
    );
  }
}

ContentList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default MovieContentList;
