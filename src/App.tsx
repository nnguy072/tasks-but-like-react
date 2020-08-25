import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Tasks from './components/Task/Tasks';
import { TaskModel } from './models/task';
import Header from './components/layout/Header';
import AddTask from './components/Task/AddTask';
// import { v4 as uuid} from 'uuid';
import About from './components/pages/About';
import axios from 'axios';

type AppProps = {
}

type AppState = {
  tasks: TaskModel[];
}

class App extends React.Component<AppProps, AppState> {
  private fakeApiBaseUrl: string = "https://jsonplaceholder.typicode.com";
  
  constructor(props: AppProps) {
    super(props);

    this.state = {
      tasks: []
    }
  }

  async componentDidMount() {
    const response = await axios.get(this.fakeApiBaseUrl + '/todos?_limit=10');

    this.setState({
      tasks: response.data.map((o: any) => new TaskModel(o.id, o.title, o.completed))
    })
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

  private async addTask(title: string): Promise<void> {
    console.log(title);

    // this.setState({
    //   tasks: [...this.state.tasks, new TaskModel(uuid(), title)]
    // });

    const createCommand: any = {
      title: title, 
      completed: false
    };

    const response = await axios.post(this.fakeApiBaseUrl + '/todos', createCommand);

    this.setState({
      tasks: [...this.state.tasks, new TaskModel(response.data.id, response.data.title, response.data.completed)]
    });
  }

  private async deleteTask(id: string): Promise<void> {
    console.log(id);

    const response = await axios.delete(this.fakeApiBaseUrl + '/todos/' + id);
    console.log(response);

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
