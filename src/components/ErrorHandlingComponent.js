import React from 'react';

export default function ErrorHandlingComponent({ hasErrorOccured, error }) {
  return (
    <div>
      {hasErrorOccured && (
        <div style={styles.root}>
          Error occured
          <div>{error.message}</div>
        </div>
      )}
    </div>
  );
}

const styles = {
  root: {
    color: 'red'
  }
};
