import React from "react";
import { Link } from "react-router-dom";
import styles from "./ForgotPassword.module.scss";

export default function ForgotPassword() {
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2>Forgot Password</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email address"
                    />
                </div>
                <div className={styles.formGroup}>
                    <button type="button">Reset Password</button>
                </div>
                <div className={styles.options}>
                    <Link to="/login">Back to Login</Link>
                </div>
            </div>
        </div>
    );
};
