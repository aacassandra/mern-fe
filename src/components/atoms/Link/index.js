import React from 'react';
import PropTypes from 'prop-types';
import './link.scss';

const Link = ({ title, onClick }) => {
  return (
    <p className="link" onClick={onClick}>
      {title}
    </p>
  );
};

Link.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func
};

export default Link;
