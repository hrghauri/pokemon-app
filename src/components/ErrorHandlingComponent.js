import React from 'react';
import { Spring } from 'react-spring/renderprops';

export default function ErrorHandlingComponent({ hasErrorOccured, error }) {
  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {props => (
        <div style={props}>
          <div>Error occured</div>
        </div>
      )}
    </Spring>
  );
}

const styles = {
  root: {
    color: 'red'
  }
};
