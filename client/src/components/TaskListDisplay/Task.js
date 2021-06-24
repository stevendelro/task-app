import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

function Task({
  userState,
  taskState,
  editTask,
  deleteTask,
  toggleEditMode,
  currentTaskId,
}) {
  const useStyles = makeStyles(theme => ({
    accordian: {
      width: '100%',
      listStyle: 'none',
      padding: theme.spacing(1, 0),
    },
    chipTagGroup: {
      marginLeft: theme.spacing(2),
      padding: theme.spacing(1, 0),
    },
    chipTag: {
      marginLeft: theme.spacing(1),
    },
    buttonGroup: {
      height: '42px',
      padding: theme.spacing(0, 3),
    },
    taskItemContainer: {
      paddingLeft: theme.spacing(1),
      backgroundColor: taskState.completed ? '' : theme.palette.grey[300],
    },
    titleContainer: {
      paddingLeft: theme.spacing(2),
    },
    titleText: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      height: '32px',
    },
    taskPriorityRadios: {
      marginLeft: '8px',
      borderRight: '1px solid rgba(0, 0, 0, 0.30)',
    },
    taskImportanceRadios: {
      marginLeft: '16px',
    },
    editDetails: {
      marginLeft: '29px',
    },
    taskFooter: {
      margin: theme.spacing(3, 0),
    },
  }));
  const classes = useStyles();
  const currentlyEditing = false;
  const { importance } = taskState.priority.secondary;
  const [primaryLevel, setPrimaryLevel] = useState('high');
  const [primaryValue, setPrimaryValue] = useState(1);

  const [taskImportance, setTaskImportance] = useState(null);
  const [secondaryValue, setSecondaryValue] = useState(null);

  const handleToggleEdit = () => toggleEditMode(currentTaskId);

  const handlePrimaryChange = event => {
    setPrimaryValue(Number(event.target.value));

    if (event.target.value === 1) {
      setPrimaryLevel('low');
    }
    if (event.target.value === 2) {
      setPrimaryLevel('high');
    }
    if (event.target.value === 3) {
      setPrimaryLevel('urgent');
    }
  };

  const handleSecondaryChange = event => {
    if (event.target.value === 'less') {
      setTaskImportance(event.target.value);
      setSecondaryValue(1);
    }
    if (event.target.value === 'more') {
      setTaskImportance(event.target.value);
      setSecondaryValue(2);
    }
  };

  return (
    <li className={classes.accordian}>
      <Accordion className={classes.taskItemContainer}>
        {/* SUMMARY */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() => {
            userState.currentlyEditing ? handleToggleEdit() : null;
          }}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header">
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={event => {
              event.stopPropagation();
            }}
            onFocus={event => event.stopPropagation()}
            control={
              importance.toLowerCase() === 'high' ? (
                <NewReleasesOutlinedIcon
                  color={taskState.completed ? 'inherit' : 'primary'}
                />
              ) : (
                <LabelOutlinedIcon
                  color={taskState.completed ? 'inherit' : 'primary'}
                />
              )
            }
            label={
              <div className={classes.titleContainer}>
                {userState.currentlyEditing &&
                currentTaskId === userState.taskInEdit ? (
                  <Input
                    placeholder="Edit Task Title"
                    inputProps={{ 'aria-label': 'description' }}
                  />
                ) : (
                  <Typography className={classes.titleText} variant="body1">
                    {taskState.tasktitle}
                  </Typography>
                )}
              </div>
            }
          />
        </AccordionSummary>

        {/* DETAILS */}
        <AccordionDetails>
          {userState.currentlyEditing &&
          currentTaskId === userState.taskInEdit ? (
            <Input
              className={classes.editDetails}
              placeholder="Edit Details"
              inputProps={{ 'aria-label': 'description' }}
            />
          ) : (
            <Typography color="textSecondary">{taskState.details}</Typography>
          )}
        </AccordionDetails>
        <Box className={classes.taskFooter}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignContent="center">
            {userState.currentlyEditing &&
            currentTaskId === userState.taskInEdit ? (
              <div>
                <FormControl
                  className={classes.taskPriorityRadios}
                  component="fieldset">
                  {/* <FormLabel component="legend">Priority</FormLabel> */}
                  <RadioGroup
                    row
                    aria-label="priority"
                    name="priority"
                    value={primaryValue}
                    onChange={handlePrimaryChange}>
                    <FormControlLabel
                      value={1}
                      control={<Radio color="secondary" />}
                      label="Low"
                      labelPlacement="left"
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio color="secondary" />}
                      label="High"
                      labelPlacement="left"
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio color="secondary" />}
                      label="Urgent"
                      labelPlacement="left"
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
                      labelPlacement="left"
                    />
                    <FormControlLabel
                      value="more"
                      numvalue={2}
                      control={<Radio color="primary" />}
                      label="More"
                      labelPlacement="left"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            ) : (
              <div className={classes.chipTagGroup}>
                {taskState.tags.map((tag, index) => (
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
            )}
            {userState.currentlyEditing ? (
              <ButtonGroup
                className={classes.buttonGroup}
                variant="text"
                color="primary"
                aria-label="outlined primary button group">
                <Button onClick={handleToggleEdit}>Cancel</Button>
                <Button>Submit</Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup
                className={classes.buttonGroup}
                variant="text"
                color="primary"
                aria-label="outlined primary button group">
                <Button>Done</Button>
                <Button onClick={handleToggleEdit}>Edit</Button>
                <Button>Delete</Button>
              </ButtonGroup>
            )}
          </Grid>
        </Box>
      </Accordion>
    </li>
  );
}

export default Task;
