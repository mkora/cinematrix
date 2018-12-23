import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

const ContentParagraphList = (props) => {
  const {
    data,
    classes,
  } = props;

  if (typeof data === 'object') {
    return (
      <div>
        {Object.keys(data).map((key, k) => <div key={k}>
            <Typography className={classes.heading}>{key}:</Typography>
            <Typography gutterBottom>{data[key]}</Typography>
          </div>
        )}
      </div>
    );    
  }

  if (Array.isArray(data)) {
    return (
      <div>
        {data.map((d, k) => <Typography key={k}>{d}</Typography> )}
      </div>
    );
  }

  return <Typography>{data}</Typography>;
}

ContentParagraphList.propTypes = {
  data: PropTypes.any.isRequired,
};

export default withStyles(styles)(ContentParagraphList);
