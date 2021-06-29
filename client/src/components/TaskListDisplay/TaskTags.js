import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  chipTagGroup: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1, 0),
  },
  chipTag: {
    marginLeft: theme.spacing(1),
  },
}));

function TaskTags({ tags }) {
  const classes = useStyles();
  return (
    <div className={classes.chipTagGroup}>
      {tags.map((tag, index) => (
        <Chip
          className={classes.chipTag}
          key={`tag-${tag}-${index}`}
          variant="outlined"
          size="small"
          label={tag}
          color="secondary"
        />
      ))}
    </div>
  );
}

export default TaskTags;
