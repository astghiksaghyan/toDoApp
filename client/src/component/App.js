import React from "react";
import ToDoList from "./ToDoList/ToDoList";
import "./App.css"

export default class App extends React.Component {
	render() {
		return ( <div className="app-component" >
				<ToDoList/>
			</div>
		);
	}
}
