import React from 'react';
import { Spring } from 'react-spring/renderprops';

export default function ErrorHandlingComponent({ hasErrorOccured, error }) {
  return (
    <div>
      {hasErrorOccured && (
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={{ duration: 1500 }}
        >
          {props => (
            <div style={props}>
              <div style={styles.root}>
                <div>Error Occured.</div>
                <div>{error.message}</div>
              </div>
            </div>
          )}
        </Spring>
      )}
    </div>
  );
}

const styles = {
  root: {
    color: 'red'
  }
};
