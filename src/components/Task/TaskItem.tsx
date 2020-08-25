import React from 'react';
import { TaskModel } from '../../models/task';

type TaskItemProps = {
  task: TaskModel;
  markComplete: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
}

export default class TaskItem extends React.Component<TaskItemProps> {
  private getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: this.props.task.completed ? 'line-through' : 'none'
    }
  }

  render(): JSX.Element {
    const { id, title } = this.props.task;

    return (
      <div style={this.getStyle()}>
        <p>
          <input type="checkbox" onChange={() => this.props.markComplete(id)} /> {' '}
          { title }
          <button style={btnStyle} onClick={() => this.props.deleteTask(id)}>
            x
          </button>
        </p>
      </div>
    );
  }
}

const btnStyle: React.CSSProperties = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  padding: '5px 9px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'
};