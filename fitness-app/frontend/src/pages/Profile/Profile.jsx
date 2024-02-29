import React, { useState } from 'react';
import './Profile.scss';

const TaskList = ({ tasks }) => {
	return (
		<ul className="task-list">
			{tasks.map((task, index) => (
				<li key={index}>{task}</li>
			))}
		</ul>
	);
};

function Profile() {
	const [name, setName] = useState("Matti Meikäläinen");
	const [age, setAge] = useState(26);
	const [newTask, setNewTask] = useState("");
	const [tasks, setTasks] = useState([
		"Determine Benchmark",
		"Choose your Subscription",
		"Add Allergies",
		"Choose Pharmacy",
		"Upload Driving Licence",
	]);
	const [isTasksCompleted, setIsTasksCompleted] = useState(false);
	const [error, setError] = useState("");

	const handleNewTask = () => {
		if (newTask.trim() !== "") {
			setTasks([...tasks, newTask]);
			setNewTask("");
			setError("");
		} else {
			setError("Task name cannot be empty");
		}
	};

	const handleTasksCompletion = () => {
		// Check if all tasks are completed
		setIsTasksCompleted(tasks.length === 5);
	};

	return (
		<div className="profile-container">
			<div className="top-banner">
				<div className="greeting">Hi, {name}! 👋</div>
				<div className="wellness-guide">
					<h4>Your wellness guide</h4>
					{age} years old
				</div>
			</div>
			<h3>Tasks</h3>
			{isTasksCompleted ? (
				<p>All tasks completed! 🎉</p>
			) : (
				<TaskList tasks={tasks} />
			)}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleNewTask();
					handleTasksCompletion();
				}}
				className="new-task-form"
			>
				<input
					type="text"
					placeholder="Add New Task"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
				/>
				<button type="submit">Save as a new task</button>
				{error && <p className="error-message">{error}</p>}
			</form>
		</div>
	);
}

export default Profile;
