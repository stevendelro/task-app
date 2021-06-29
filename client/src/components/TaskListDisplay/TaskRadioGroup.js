import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';

import TaskTags from './TaskTags';

const useStyles = makeStyles(theme => ({
  taskPriorityRadios: {
    marginLeft: '8px',
    borderRight: '1px solid rgba(0, 0, 0, 0.30)',
  },
  taskPriorityRadioGroup: {
    paddingRight: theme.spacing(2),
  },
  taskImportanceRadios: {
    marginRight: theme.spacing(2),
  },
  tagEditField: {
    marginLeft: '45px',
  },
}));

function TaskRadioGroup({
  inTagEditMode,
  primaryValue,
  handlePrimaryChange,
  taskImportance,
  handleSecondaryChange,
  tagEdits,
  setTagEdits,
  isEditingThisTask,
  tags,
}) {
  const classes = useStyles();

  if (isEditingThisTask) {
    return inTagEditMode ? (
      <TextField
        className={classes.tagEditField}
        variant="outlined"
        label="Edit Tags"
        value={tagEdits}
        onChange={event => setTagEdits(event.target.value)}
      />
    ) : (
      <div>
        <FormControl
          className={classes.taskPriorityRadios}
          component="fieldset">
          <RadioGroup
            row
            className={classes.taskPriorityRadioGroup}
            aria-label="priority"
            name="priority"
            value={primaryValue}
            onChange={handlePrimaryChange}>
            <FormControlLabel
              value={1}
              control={<Radio color="secondary" />}
              label="Low"
              labelPlacement="start"
            />
            <FormControlLabel
              value={2}
              control={<Radio color="secondary" />}
              label="High"
              labelPlacement="start"
            />
            <FormControlLabel
              value={3}
              control={<Radio color="secondary" />}
              label="Urgent"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
        <FormControl
          className={classes.taskImportanceRadios}
          component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            value={taskImportance}
            onChange={handleSecondaryChange}>
            <FormControlLabel
              value="less"
              numvalue={1}
              control={<Radio color="primary" />}
              label="Less"
              labelPlacement="start"
            />
            <FormControlLabel
              value="more"
              numvalue={2}
              control={<Radio color="primary" />}
              label="More"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  } else {
    return <TaskTags tags={tags} />;
  }
}

export default TaskRadioGroup;
