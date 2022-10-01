import React, { useImperativeHandle } from 'react';
import './inputfield.scss';

// eslint-disable-next-line react/display-name
const Textfield = React.forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    childMethod() {
      console.log('call me');
      return true;
    }
  }));

  return <input {...props} />;
});

export default Textfield;
