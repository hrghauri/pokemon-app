import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';

export default function FilteringComponent({
  filterName,
  allFilteringValues,
  selectedFilteringValues,
  onFilterValueSelection,
  onFilterClose,
  open,
  anchorEL
}) {
  const onCheck = (name, filterType, filterValue) => {
    onFilterValueSelection(name, filterType, filterValue);
  };

  const renderCheckBoxes = () => {
    return allFilteringValues.map(filteringValue => {
      return (
        <div key={filteringValue}>
          <FormLabel>{filteringValue}</FormLabel>
          <Checkbox
            checked={selectedFilteringValues.includes(filteringValue)}
            onChange={e =>
              onCheck(filterName, filteringValue, e.target.checked)
            }
          />
        </div>
      );
    });
  };

  return (
    <Dialog open={open} onClose={() => onFilterClose(filterName)}>
      {renderCheckBoxes()}
    </Dialog>
  );
}
