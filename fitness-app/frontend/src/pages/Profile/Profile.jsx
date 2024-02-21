import React from "react";

function Profile() {
	return (
		<div className="profile-container">
			<div className="greeting">Hi, Ade! 👋</div>
			<div className="wellness-guide">
				Your wellness guide
				<br />
				21 years old
			</div>
			<ul className="task-list">
				<li>Determine Benchmark</li>
				<li>Choose your Subscription</li>
				<li>Add Allergies</li>
				<li>Choose Pharmacy</li>
				<li>Upload Driving Licence</li>
			</ul>
		</div>
	);
}

export default Profile;
