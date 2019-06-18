import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';

export default function ListFooter({ numOfPages, currentPage, onPageSelect }) {
  const renderOtherPageOptions = () => {
    const options = [];
    for (let i = 1; i <= numOfPages; i++) {
      options.push(i);
    }

    return options.map(optionValue => {
      return (
        <option key={optionValue} value={optionValue}>
          {optionValue}
        </option>
      );
    });
  };

  const optionsSelect = e => {
    const optionValue = parseInt(e.target.value);
    onPageSelect(optionValue);
  };

  const onPreviousClick = () => {
    const previousPage = currentPage - 1;
    onPageSelect(previousPage);
  };

  const onNextClick = () => {
    const nextPage = currentPage + 1;
    onPageSelect(nextPage);
  };

  return (
    <div>
      {currentPage !== 1 && (
        <Button variant="contained" onClick={onPreviousClick}>
          Previous
        </Button>
      )}
      {currentPage === 1 && (
        <Button variant="contained" color="secondary" disabled>
          Previous
        </Button>
      )}
      <NativeSelect value={currentPage} onChange={optionsSelect}>
        {renderOtherPageOptions()}
      </NativeSelect>
      {currentPage !== numOfPages && (
        <Button variant="contained" onClick={onNextClick}>
          Next
        </Button>
      )}
      {currentPage === numOfPages && (
        <Button variant="contained" color="secondary" disabled>
          Next
        </Button>
      )}
    </div>
  );
}
