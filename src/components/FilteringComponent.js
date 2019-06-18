import React from 'react';
import Popover from '@material-ui/core/Popover';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

export default function FilteringComponent({
  filterName,
  allFilteringValues,
  selectedFilteringValues,
  onFilterValueSelection,
  onFilterClose,
  open,
  anchorEL
}) {
  return (
    <Popover
      open={open}
      onClose={() => onFilterClose(filterName)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      anchorEl={anchorEL}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
    >
      <Typography>{filterName} Hahhaha</Typography>
    </Popover>
  );
}
