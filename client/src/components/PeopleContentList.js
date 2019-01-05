import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentList from './ContentList';
import ContentParagraphDate from './ContentParagraphDate';
import * as api from  '../api';

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
  
      const data = await api.people(type);
      if(data.success) {
        const list = data.data.map((v) => {
          return {
            heading: `${v.firstname} ${v.lastname}`,
            subHeading: (
              Array.isArray(v.directed)
                && v.directed.length > 0
                ? 'Director ' : ''
              ) + (
              Array.isArray(v.casted)
                && v.casted.length > 0
                ? 'Actor ' : ''
              ),
            firstColumn: {
              Born: 
                v.birthday && 
                  <ContentParagraphDate date={v.birthday}>
                    {v.birthplace && ` in ${v.birthplace}`}
                  </ContentParagraphDate>,
              Died: v.deathday && <ContentParagraphDate date={v.deathday} />,
              'Known for':
                `${v.directed.map(d => ` ${d.title}`)} 
                 ${v.casted.map(d => ` ${d.title}`)}`
            },
            secondColumn: 
              v.pic ? v.pic : 'No image',
            credits: v.source,
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

PeopleContentList.propTypes = {
  type: PropTypes.oneOf([api.typeActorList, api.typeDirectorList]).isRequired,
};

export default PeopleContentList;
