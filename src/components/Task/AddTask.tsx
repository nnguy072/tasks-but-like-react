import React from 'react';

type AddTaskProps = {
  addTask: (title: string) => Promise<void>;
}

export default class AddTask extends React.PureComponent<AddTaskProps> {
  state = {
    title: ''
  }

  onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.addTask(this.state.title);
    this.setState({ title: ''});
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({
    [e.target.name]: e.target.value // can reuse handler for multiple inputs now
  });

  render(): JSX.Element {
    return (
      <form onSubmit={this.onSubmit}  style={{ display: "flex"}}>
        <input type="text" 
               name="title" 
               style={{ flex: '10', padding: '5px'}}
               placeholder="Add Task" 
               value={this.state.title}
               onChange={this.onChange}
        />
        <input type="submit" 
               value="Submit" 
               className="btn"
               style={{ flex: '1' }} 
        />
      </form>
    );
  }
}