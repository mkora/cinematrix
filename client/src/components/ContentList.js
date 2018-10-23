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
      data,
    } = this.props;

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
};

export default withStyles(styles)(ContentList);
