import React, { Component } from "react";
import { render } from "react-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Icon from '@material-ui/core/Icon';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      duration: 'short',
      status: false,
      recorded_time: 0,
      tasks: []
    };

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
    this.handleRecordedTimeChange = this.handleRecordedTimeChange.bind(this);
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleDurationChange(event) {
    this.setState({
      duration: event.target.value
    });
  }

  toggleStatus(event) {
    this.setState({
      status: event.target.checked
    });
  }

  handleRecordedTimeChange(event) {
    this.setState({
      recorded_time: event.target.value
    });
  }

  handleTaskSubmit(event) {
    event.preventDefault();

    this.setState(prevState => ({
      tasks: [
        ...prevState.tasks,
        {
          description: this.state.description,
          duration: this.state.duration,
          status: this.state.status,
          recorded_time: this.state.recorded_time
        }
      ]
    }));

    this.clearCurrentTask();
  }

  clearCurrentTask() {
    this.setState({
      description: '',
      duration: 'short',
      status: false,
      recorded_time: 0
    });
  }

  componentDidMount() {
      window.console.log('[Console] It works properly! :) 3');
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col xs={12}>
              <h1 className="text-center mt-3 mb-4">To-Do List</h1>
            </Col>
          </Row>
          <Row className="rounded border border-1 bg-light py-3">
            <Col xs={3}>
              <Form.Label>Task description:</Form.Label>
              <Form.Control
                type="text"
                placeholder="What have you worked on?"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              />
            </Col>
            <Col xs={3}>
              <Form.Label>Duration:</Form.Label>
              <Form.Control
                as="select"
                value={this.state.duration}
                onChange={this.handleDurationChange}
              >
                <option value={'short'}>0 - 30 min</option>
                <option value={'medium'}>31 - 45 min</option>
                <option value={'long'}>46 - 60 min</option>
              </Form.Control>
            </Col>
            <Col xs={2}>
              <Form.Label>Status:</Form.Label>
              <Form.Check 
                type="switch"
                id="custom-switch"
                label={(this.state.status ? 'Completed' : 'Pending')}
                checked={this.state.status}
                onChange={this.toggleStatus}
              />
            </Col>
            {this.state.status &&
              <Col xs={3}>
                <Form.Label>Recorded time (In Minutes):</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ej. 60"
                  className="text-right"
                  min="0"
                  value={this.state.recorded_time}
                  onChange={this.handleRecordedTimeChange}
                />
              </Col>
            }
            <Col xs={1}>
              <Form.Label>{' '}</Form.Label>
              <Button onClick={this.handleTaskSubmit} variant="primary" block>
                ADD
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table className="mt-5" striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th className="text-center">Duration</th>
                    <th className="text-center">Status</th>
                    <th className="text-right">Recorded time</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map((task, i) => 
                    <tr key={`task-${i + 1}`}>
                      <td>{ i + 1 }</td>
                      <td>{ task.description }</td>
                      <td className="text-center">{ task.duration }</td>
                      <td className="text-center">
                        { task.status ?
                          <Icon className="material-icons-outlined mr-2">task_alt</Icon> :
                          <Icon className="material-icons-outlined mr-2">pending_actions</Icon>}
                        { task.status ? 'Completed' : 'Pending' }
                      </td>
                      <td className="text-right">{ task.status ? task.recorded_time : '' }</td>
                      <td className="text-center">
                        <Button variant="outline-primary" size="sm">
                          <Icon>edit</Icon>
                        </Button>
                        <Button variant="outline-danger" size="sm" className="ml-2">
                          <Icon>delete</Icon>
                        </Button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);