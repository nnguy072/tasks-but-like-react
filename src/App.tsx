import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Tasks from './components/Task/Tasks';
import { TaskModel } from './models/task';
import Header from './components/layout/Header';
import AddTask from './components/Task/AddTask';
import { v4 as uuid} from 'uuid';
import About from './components/pages/About';

class App extends React.Component {
  state = {
    tasks: [
      new TaskModel(uuid(), "Create App"),
      new TaskModel(uuid(), "Create Tasks"),
      new TaskModel(uuid(), "Drink water"),
    ]
  }

  private markComplete(id: string): void {
    console.log(id);

    this.setState({
      tasks: this.state.tasks.map(task => {
        if (task.id === id)
          task.completed = true;
        return task;
      })
    });
  }

  private addTask(title: string): void {
    console.log(title);

    this.setState({
      tasks: [...this.state.tasks, new TaskModel(uuid(), title)]
    });
  }

  private deleteTask(id: string): void {
    console.log(id);

    this.setState({
      tasks: this.state.tasks.filter(o => o.id !== id)
    });
  }

  render(): JSX.Element {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTask addTask={(title) => this.addTask(title)} />
                <Tasks tasks={this.state.tasks} 
                      markComplete={(id) => this.markComplete(id)}
                      deleteTask={(id) => this.deleteTask(id)}/>
              </React.Fragment>
            )} />

            <Route path="/about"  component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
