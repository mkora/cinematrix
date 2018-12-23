import React, { Component } from 'react';
import ContentList from './ContentList';
import { movies } from  '../api';

class MovieContentList extends Component {
  state = {
    data: [],
    isError: false,
    isLoading: false,
    isOpenSnack: false,
  };

  async componentDidMount() {
    try {
      const data = await movies();
      if(data.success) {
        const list = data.data.map((v) => {
          const isMovie = v.episodes === 1 ? true : false;
          return {
            heading: v.title,
            subHeading: `| ${v.country} | ${v.duration} min | (genre - TBD) | 
              ${(isMovie ? `Movie` : `TV Series (${v.year})`)} | IMDB: ${v.imdb['$numberDecimal']}`,
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
          isOpenSnack: false,
        });
      } else {
        this.setState({
          isError: true,
          isLoading: false,
          isOpenSnack: true,
        });
        console.log(data.error);
      }
    } catch (err) {
      this.setState({
        isError: true,
        isLoading: false,
        isOpenSnack: true,
      });
      console.log(err);
    }
  }

  handleSnackCloseClick = () => {  
    this.setState({ isOpenSnack: false });
  };

  render() {
    const {
      data,
      isLoading,
      isError,
      isOpenSnack,
    } = this.state;

    return (
      <ContentList
        data={data}
        isLoading={isLoading}
        isError={isError}
        isOpenSnack={isOpenSnack}
        onSnackClose={this.handleSnackCloseClick}
      />
    );
  }
}

export default MovieContentList;
