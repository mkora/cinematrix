import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentList from './ContentList';
import { movies } from  '../api';
import MovieContentForm from './MovieContentForm';

class MovieContentList extends Component {
  state = {
    data: [],
    isError: false,
    isLoading: false,
    isOpenSnack: false,
  };

  handleSnackCloseClick = () => {
    this.setState({
      isOpenSnack: false,
    });
  };

  async componentDidMount() {
    try {
      const data = await movies();
      if(data.success) {
        const list = data.data.map((v) => {
          const isMovie = v.episodes === 1;
          return {
            heading: v.title,
            subHeading: 
              `| ${v.country}
               | ${(v.duration) ? v.duration : '> 5'} min
               | (genre - TBD)
               | ${(isMovie ? `Movie` : `TV Series (${v.year})`)}
               | IMDB: ${v.imdb['$numberDecimal']}`,
            firstColumn: {
              Creators:
                `${v.directed.map(d => ` ${d.firstname} ${d.lastname}`)}`,
              Stars: 
                `${v.casted.map(d => ` ${d.firstname} ${d.lastname}`)}`,
            },
            secondColumn: v.synopsis,
            credits: v.source,
            id: v._id,
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


  render() {
    const {
      data,
      isLoading,
      isError,
      isOpenSnack,
    } = this.state;

    const {
      isDialogOpen,
      onDialogSave,
      onDialogClose,
      onDialogEditClick
    } = this.props;

    return (
      <ContentList
        data={data}
        isLoading={isLoading}
        isError={isError}
        isOpenSnack={isOpenSnack}
        onSnackClose={this.handleSnackCloseClick}
        onEditClick={onDialogEditClick}
      >
        <MovieContentForm 
          isDialogOpen={isDialogOpen}
          onDialogSave={onDialogSave}
          onDialogClose={onDialogClose} 
        />
      </ContentList>
    );
  }
}

MovieContentList.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  onDialogSave: PropTypes.func.isRequired,
  onDialogClose: PropTypes.func.isRequired,
  onDialogEditClick: PropTypes.func.isRequired,
};

export default MovieContentList;
