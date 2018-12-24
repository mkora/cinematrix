import React, { Component } from 'react';
import ContentList from './ContentList';
import { people } from  '../api';

class PeopleContentList extends Component {
  state = {
    data: [],
    isError: false,
    isLoading: false,
    isOpenSnack: false,
  };

  async componentDidMount() {
    try {
      const {
        type
      } = this.props;
  
      const data = await people(type);
      if(data.success) {
        const list = data.data.map((v) => {
          return {
            heading: "test",
            subHeading: "test",
            firstColumn: {
              Test: "test"
            },
            secondColumn: "test",
            credits: {
              Credits: v.source, // Link?
            },
            editAction: `actor-edit/${v._id}`,
            deleteAction: `actor-delete/${v._id}`,
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

export default PeopleContentList;
