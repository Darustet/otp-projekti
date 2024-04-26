import styles from './Settings.module.scss'
import {useState} from 'react';
import FormTextElement from '../FormTextElement';

export default function Settings() {
    const [newEmail, setNewEmail] = useState(""),
        [newPassword, setNewPassword] = useState(""),
        [confirmPassword, setConfirmPassword] = useState("")

    function handleSaveEmail(e)  {
        e.preventDefault()
    }

    function handleSavePassword(e) {
        e.preventDefault()
    }

    return <div className={styles.settingsPage}>
        <h1>Settings</h1>
        <div className={styles.settingsSection}>
            <h2>Change Email</h2>
            <form className={styles.changeEmailForm} onSubmit={handleSaveEmail}>
                <FormTextElement
                    id="newEmail"
                    innerText="New Email"
                    stateValue={newEmail}
                    handlerFunction={setNewEmail}
                />
                <button type="submit">Save Changes</button>
            </form>
        </div>
        <div className={styles.settingsSection}>
            <h2>Change Password</h2>
            <form className={styles.changePasswordForm} onSubmit={handleSavePassword}>
                <FormTextElement
                    id="newPassword"
                    inputType="password"
                    stateValue={newPassword}
                    handlerFunction={setNewPassword}
                />
                <FormTextElement
                    id="confirmPassword"
                    inputType="password"
                    stateValue={confirmPassword}
                    handlerFunction={setConfirmPassword}
                />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    </div>
}