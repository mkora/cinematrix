import React, { Component } from 'react';
import ContentList from './ContentList';
import { movies } from  '../api';
import MovieContentForm from './MovieContentForm';

class MovieContentList extends Component {
  state = {
    data: [],
    isError: false,
    isLoading: false,
    isOpenSnack: false,
    isOpenDialog: false,
  };

  handleEditClick = () => {
    this.setState({ isOpenDialog: true });
  }

  handleDialogClose = () => {
    this.setState({ isOpenDialog: false });
  };

  handleDialogSave = (id) => (e) => {
    this.setState({ isOpenDialog: false });
    // call save function
    console.log(`Save ${id}`);
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
        onEditClick={this.handleEditClick}
      >
        <MovieContentForm
          open={this.state.isOpenDialog}
          onSave={this.handleDialogSave}
          onClose={this.handleDialogClose}
        />
      </ContentList>
    );
  }
}

export default MovieContentList;
