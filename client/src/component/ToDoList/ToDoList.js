import React from "react";
import axios from "axios";
import { Container } from 'react-bootstrap';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import ToDo from "../ToDo/ToDo";

export default class ToDoList extends React.Component {
    state = {
        tasks: [],
        value: ""
    };

    getTasks = () => {
        axios.get('http://localhost:4000/todos/')
        .then(response => {
            this.setState({ tasks: response.data });
        })
        .catch(function (error){
            console.log(error);
        })
    };

    componentDidMount() {
        this.getTasks();
    }

    getTasksMap = (tasks) => {
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

    onSave = (event) => {
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
                this.getTasks();
            });
        }
    };

    onUpdate = (id, updatedTask) => {
        axios.post('http://localhost:4000/todos/update/' + id, updatedTask)
        .then((res) => {
            this.getTasks();
        });
    };

    render() {
        const tasks = this.getTasksMap(this.state.tasks);
        return (
            <Container>
                {tasks.notCompleted.map((task) => {
                        return <ToDo
                            description={task.description}
                            key={task.id}
                            id={task._id}
                            completed={task.completed}
                            onUpdate={this.onUpdate.bind(this)}
                        />;
                    }
                )}
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
                {tasks.completed.map((task) => {
                    return <ToDo
                        description={task.description}
                        key={task.id}
                        id={task._id}
                        completed={task.completed}
                        onUpdate={this.onUpdate.bind(this)}
                    />;
                })}
            </Container>
        );
    }
}
