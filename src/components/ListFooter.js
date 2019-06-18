import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';

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
    const optionValue = e.target.value;
    onPageSelect(optionValue);
  };

  return (
    <div>
      <NativeSelect value={currentPage} onChange={optionsSelect}>
        {renderOtherPageOptions()}
      </NativeSelect>
    </div>
  );
}
