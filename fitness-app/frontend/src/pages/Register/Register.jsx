import React from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.scss";

const Register = () => {
    return (
        <>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Register Page</title>
            <link rel="stylesheet" href={styles.container} />

            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <h2>Register</h2>
                    <div className={styles.formGroup}>
                        <label htmlFor="reg-username">Username:</label>
                        <input
                            type="text"
                            id="reg-username"
                            name="reg-username"
                            placeholder="Choose a username"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="reg-password">Password:</label>
                        <input
                            type="password"
                            id="reg-password"
                            name="reg-password"
                            placeholder="Choose a password"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <button type="button">Register</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;