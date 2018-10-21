import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ContentExtentionPanel from './ContentExtentionPanel';

const styles = theme => ({
  root: {
    width: '100%',
  },
});

class ContentList extends Component {
  render() {
    const {
      classes,
      // data,
    } = this.props;
    const data = [
        {
        summary: 'Movie title 1, year, country', // Actor full name
        mainDetails: 'Movie synopsis 1', // Actor bio
        secondaryDetails: 'eq pic || duration & number of episodes #1', // Actor pic || additial info
        editAction: 'movie-edit/1',
        deleteAction: 'movie-edit/1',
      },
      {
        summary: 'Movie title 2, year, country', // Actor full name
        mainDetails: 'Movie synopsis 2', // Actor bio
        secondaryDetails: 'eq pic || duration & number of episodes #2', // Actor pic || additial info
        editAction: 'movie-edit/2',
        deleteAction: 'movie-edit/2',
      },
      {
        summary: 'Movie title 3, year, country', // Actor full name
        mainDetails: 'Movie synopsis 3', // Actor bio
        secondaryDetails: 'eq pic || duration & number of episodes #3', // Actor pic || additial info
        editAction: 'movie-edit/3',
        deleteAction: 'movie-edit/3',
      },
    ];
    return (
      <div className={classes.root}>
        {data.map((d, k) => <ContentExtentionPanel key={k} data={d} /> )}
      </div>
    );
  }
}

ContentList.propTypes = {
  classes: PropTypes.object.isRequired,
  // data: PropTypes.array.isRequired,
};

export default withStyles(styles)(ContentList);
