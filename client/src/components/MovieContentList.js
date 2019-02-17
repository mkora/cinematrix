import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentList from './ContentList';
import { movies } from  '../api';
import MovieContentForm from './MovieContentForm';

class MovieContentList extends Component {
  state = {
    clickedId: null,
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

  handleEditClick = id => e => {
    this.props.onDialogEditClick();
    this.setState({
      clickedId: id,
    });
  }

  async componentDidMount() {
    try {
      const data = await movies();
      if(data.success) {
        const list = data.data.map(v => {
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
          clickedId: null,
        });
      } else {
        this.setState({
          isError: true,
          isLoading: false,
          isOpenSnack: true,
          clickedId: null,
        });
        console.log(data.error);
      }
    } catch (err) {
      this.setState({
        isError: true,
        isLoading: false,
        isOpenSnack: true,
        clickedId: null,
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
      clickedId,
    } = this.state;

    const {
      isDialogOpen,
      onDialogSave,
      onDialogClose,
    } = this.props;

    return (
      <ContentList
        data={data}
        isLoading={isLoading}
        isError={isError}
        isOpenSnack={isOpenSnack}
        onSnackClose={this.handleSnackCloseClick}
        onEditClick={this.handleEditClick}
      >
        <MovieContentForm 
          isDialogOpen={isDialogOpen}
          onDialogSave={onDialogSave}
          onDialogClose={onDialogClose}
          clickedId={clickedId}
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
