import React, { Component } from 'react';
import { NavLink as ReactLink } from 'react-router-dom';

class ContentFormatLink extends Component {
  
  parseTo(to) {
    let parser = document.createElement('a');
    parser.href = to;
    return parser;
  }

  isInternal(to) {
    if(to.indexOf("://")=== -1) {
      return true;
    }
    const toLocation = this.parseTo(to);
    return window.location.hostname === toLocation.hostname;
  }

  render() {
    const {
      to,
      children,
      ...rest
    } = this.props;

    const isInternal = this.isInternal(to);

    if (isInternal) {
      return (
        <ReactLink to={to} {...rest}>{children}</ReactLink>
      );
    }

    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>
    );
  }
}

export default ContentFormatLink;
