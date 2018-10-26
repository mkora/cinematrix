import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const ParagraphList = (props) => {
  const {
    data,
  } = props;

  if (Array.isArray(data)) {
    return (
      <div>
        {data.map((d, k) => <Typography key={k} data={d} /> )}
      </div>
    );
  }

  return <Typography>{data}</Typography>;
}

ParagraphList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ParagraphList;
