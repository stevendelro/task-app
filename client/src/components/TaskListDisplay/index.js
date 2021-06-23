import React from 'react';
import { connect } from 'react-redux';
import Task from './Task';

export const TaskListDisplay = props => {
  // map over taskList to create multiple task items in this component.
  return (
    <div>
      <Task />
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskListDisplay);
