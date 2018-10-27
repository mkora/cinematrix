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
        const list = data.data.map((v) => {
          const isMovie = v.episodes === 1 ? true : false;
          return {
            heading: v.title,
            subHeading: `| ${v.country} | ${v.duration} min | (genre - TBD) | ${(isMovie ? `Movie` : `TV Series (${v.year})`)}`,
            firstColumn: {
              Creators: `${v.directed.map(d => ` ${d.firstname} ${d.lastname}`)}`, // Links?
              Stars: `${v.casted.map(d => ` ${d.firstname} ${d.lastname}`)}`,  // Links?
            },
            secondColumn: v.synopsis,
            credits: v.source, // Link?
            editAction: `movie-edit/${v._id}`,
            deleteAction: `movie-edit/${v._id}`,
          };
        });
        this.setState({
          data: list,
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
