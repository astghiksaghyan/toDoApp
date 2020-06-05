import React from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class ToDo extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        description: PropTypes.string,
        completed: PropTypes.bool,
        onUpdate: PropTypes.func
    };

    handleChange = () => {
        const updatedTask = { 
            description: this.props.description,
            completed: !this.props.completed
        };
        this.props.onUpdate(this.props.id, updatedTask);
    };

    render() {
        const { completed } = this.props;
        return (
            <Row>
                <FormControlLabel
                    checked={completed}
                    control={<Checkbox color={this.props.completed ? "primary" : "secondary"}/>}
                    label={this.props.description}
                    onChange={this.handleChange.bind(this)}
                />
            </Row>
        );
    }
}
