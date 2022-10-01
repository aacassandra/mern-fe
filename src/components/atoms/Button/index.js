import PropTypes from 'prop-types';
import './button.scss';
import React, { Component } from 'react';

function Slot() {
  return null;
}

class Button extends Component {
  static Slot = Slot;

  render() {
    const { children } = this.props;
    const slot = children;
    return (
      <button className="w-full bg-green-500 text-white py-3 rounded-xl" {...this.props}>
        {slot ? slot.props.children : 'Uknown'}
      </button>
    );
  }
}

Button.propTypes = {
  title: PropTypes.string
};

export default Button;
