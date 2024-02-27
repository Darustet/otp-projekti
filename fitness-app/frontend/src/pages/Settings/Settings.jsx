// Settings.jsx
import React, { useState } from "react";
import styles from "./Settings.module.scss";

const Settings = () => {
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSaveUsername = (e) => {
        e.preventDefault();
        // Implement logic to save changes to the server for changing username
    };

    const handleSaveEmail = (e) => {
        e.preventDefault();
        // Implement logic to save changes to the server for changing email
    };

    const handleSavePassword = (e) => {
        e.preventDefault();
        // Implement logic to save changes to the server for changing password
    };

    return (
        <div className={styles.settingsPage}>
            <h1>Settings</h1>

            <div className={styles.settingsSection}>
                <h2>Change Username</h2>
                <form className={styles.changeUsernameForm} onSubmit={handleSaveUsername}>
                    <label htmlFor="newUsername">New Username</label>
                    <input
                        type="text"
                        id="newUsername"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <button type="submit">Save Changes</button>
                </form>
            </div>

            <div className={styles.settingsSection}>
                <h2>Change Email</h2>
                <form className={styles.changeEmailForm} onSubmit={handleSaveEmail}>
                    <label htmlFor="newEmail">New Email</label>
                    <input
                        type="text"
                        id="newEmail"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <button type="submit">Save Changes</button>
                </form>
            </div>

            <div className={styles.settingsSection}>
                <h2>Change Password</h2>
                <form className={styles.changePasswordForm} onSubmit={handleSavePassword}>
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
