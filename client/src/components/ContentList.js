import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ContentExtentionPanel from './ContentExtentionPanel';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    width: '100%',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class ContentList extends Component {
  render() {
    const {
      classes,
      data,
      isLoading,
      isError,
    } = this.props;

    if (isLoading) {
      return (
        <div className={classes.loading}>
          <CircularProgress size={65} />
        </div>
      );
    }

    if (isError) {
      return (
        <div>ERROR... Check out console.log</div>
      );
    }

    return (
      <div className={classes.root}>
        {data.map((d, k) => <ContentExtentionPanel key={k} data={d} /> )}
      </div>
    );
  }
}

ContentList.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ContentList);
