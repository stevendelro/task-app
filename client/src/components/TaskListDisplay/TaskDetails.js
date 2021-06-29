import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  editDetails: {
    color: theme.palette.grey[600],
    marginLeft: '29px',
    width: '90%',
  },
}));

function TaskDetails({
  isEditingThisTask,
  editedDetails,
  handleDetailsEdit,
  details,
}) {
  const classes = useStyles();

  if (isEditingThisTask) {
    return (
      <Input
        className={classes.editDetails}
        value={editedDetails}
        onChange={handleDetailsEdit}
        placeholder="Edit Details"
        inputProps={{ 'aria-label': 'description' }}
      />
    );
  } else {
    return <Typography color="textSecondary">{details}</Typography>;
  }
}

export default TaskDetails;
