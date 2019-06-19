import React from 'react';
import Popover from '@material-ui/core/Popover';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
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
    console.log('Filtering Component: FilterName, FilterType, FilterValue');
    console.log(name, filterType, filterValue);
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

  // return (
  //   <Popover
  //     open={open}
  //     onClose={() => onFilterClose(filterName)}
  //     anchorOrigin={{
  //       vertical: 'bottom',
  //       horizontal: 'center'
  //     }}
  //     anchorEl={anchorEL}
  //     transformOrigin={{
  //       vertical: 'top',
  //       horizontal: 'center'
  //     }}
  //   >
  //     {renderCheckBoxes()}
  //     <Typography>{filterName} Hahhaha</Typography>
  //   </Popover>
  // );

  return (
    <Dialog open={open} onClose={() => onFilterClose(filterName)}>
      {renderCheckBoxes()}
    </Dialog>
  );
}
