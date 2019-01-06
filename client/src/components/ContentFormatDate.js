import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const ContentFormatDate = (props) => {
  const {
    date,
    format,
    children,
  } = props;
  
  return (
    <span>
      {moment(date).format(format ? format : 'MMMM DD, YYYY')}
      {children}
    </span>
  );
}

ContentFormatDate.propTypes = {
  date: PropTypes.any.isRequired,
  format: PropTypes.string,
};

export default ContentFormatDate;
