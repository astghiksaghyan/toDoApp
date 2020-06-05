import React from "react";
import axios from "axios";
import { Container } from 'react-bootstrap';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import ToDo from "../ToDo/ToDo";

export default class ToDoList extends React.Component {
    state = {
        tasks: [{
            description: "Task 1",
            completed: false
        }, {
            description: "Task 2",
            completed: false
        }, {
            description: "Task 3",
            completed: true
        }],
        value: ""
    };

    getTasks = (tasks) => {
        const completed = tasks.filter((task) => {
            return task.completed;
        });

        const notCompleted = tasks.filter((task) => {
            return !task.completed;
        });

        return {
            completed,
            notCompleted
        }
    };

    handleOnChange = (event) => {
        this.setState({
            value: event.target.value
        });
    };

    onSave= (event) => {
        if (event.key === 'Enter') {
            this.setState({
                value: ""
            });
            const newTodo = {
                description: event.target.value,
                completed: false
            }
            axios.post('http://localhost:4000/todos/add', newTodo)
            .then((res) => {
                this.setState({
                    value: ""
                });
            });
        }
    };

    render() {
        const tasks = this.getTasks(this.state.tasks);
        return (
            <Container>
                {tasks.completed.map((task, index) => <ToDo description ={task.description} key={index} id={index} completed={true}/>)}
                <ButtonGroup
                    orientation="vertical"
                    color="primary"
                    aria-label="vertical contained primary button group"
                    variant="text"
                >
                    <TextField
                        id="filled-basic"
                        label="Add todo"
                        variant="filled"
                        onChange={this.handleOnChange.bind(this)}
                        onKeyPress={this.onSave.bind(this)}
                        value={this.state.value}
                    />
                </ButtonGroup>
                {tasks.notCompleted.map((task, index) => <ToDo description ={task.description} key={index} id={index} completed={false}/>)}
            </Container>
        );
    }
}
