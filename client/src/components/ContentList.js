import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ContentExtentionPanel from './ContentExtentionPanel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import ContentSnackbar from './ContentSnackbar';

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
      isOpenSnack,
      onSnackClose,
      onEditClick,
      children
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
        <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={isOpenSnack}
          autoHideDuration={6000}>
            <ContentSnackbar
              variant="error"
              className={classes.margin}
              message="Oops! Something went wrong! Please, try again later."
              onClose={onSnackClose}
            />
        </Snackbar>
      );
    }

    return (
      <div className={classes.root}>
        {data.map((d, k) => (
            <ContentExtentionPanel 
              key={k}
              data={d}
              onEditClick={onEditClick}
              >
              {children}
            </ContentExtentionPanel>
          )
        )}
      </div>
    );
  }
}

ContentList.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isOpenSnack: PropTypes.bool.isRequired,
  onSnackClose: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(ContentList);
