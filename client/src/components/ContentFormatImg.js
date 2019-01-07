import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const ContentFormatImg = (props) => {
  const {
    src,
    alt
  } = props;
  
  if (!src) {
    return 'No image';
  }

  return (
    <Card>
      <CardMedia
        image={src}
        title={alt}
      />
    </Card>
  );
}

ContentFormatImg.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default ContentFormatImg;
