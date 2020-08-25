import React from 'react';
import { TaskModel } from '../../models/task';
import TaskItem from './TaskItem';

type TasksProps = {
  tasks: TaskModel[];
  markComplete: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
}

export default class Tasks extends React.Component<TasksProps> {
  render(): JSX.Element[] {
    return this.props.tasks.map((task) => (
      <TaskItem key={task.id} task={task}
                markComplete={this.props.markComplete} 
                deleteTask={this.props.deleteTask} />
    ));
  }
}