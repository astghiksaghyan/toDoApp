import React from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class ToDo extends React.Component {
    static propTypes = {
        description: PropTypes.string,
        completed: PropTypes.bool
    };

    state = {
        checked: this.props.completed
    };

    handleChange = (event) => {
        this.setState({
            checked: event.target.checked
        });
    };

    render() {
        const { checked } = this.state;
        return (
            <Row>
                <FormControlLabel
                    checked={checked}
                    control={<Checkbox color={this.props.completed ? "primary" : "secondary"}/>}
                    label={this.props.description}
                    onChange={this.handleChange.bind(this)}
                />
            </Row>
        );
    }
}
