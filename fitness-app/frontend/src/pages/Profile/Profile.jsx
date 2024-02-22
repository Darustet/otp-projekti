import React, {useState} from 'react';
import './Profile.scss'

function Profile() {
	const [name, setName] = useState("Patrick"),
		[age, setAge] = useState(26);

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
			<ul className="task-list">
				<li>Determine Benchmark</li>
				<li>Choose your Subscription</li>
				<li>Add Allergies</li>
				<li>Choose Pharmacy</li>
				<li>Upload Driving Licence</li>
			</ul>
			<form action="" className="new-task-form">
				<input type="text" placeholder="Add New Task"/>
				<input type="button" value="Save as a new task"/>
			</form>
		</div>
	);
}

export default Profile;
