import React, { useState } from "react";
import styles from "./Register.module.scss";
<<<<<<< Updated upstream
=======
import X_icon from "../../components/Icons/XIcon/X_icon";
import {Link} from "react-router-dom";
>>>>>>> Stashed changes

const Register = () => {
    const [userTag, setUserTag] = useState("");
    const [email, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        // Implement your registration logic here, for example, send data to a server
        // You can use fetch or axios to make a request to your server

        // Example of making a POST request using fetch:
        const registrationData = {
            userTag,
            email,
            password,
        };

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registrationData),
            });

            // Handle the response accordingly
            if (response.ok) {
                // Registration successful, you can redirect or show a success message
                console.log("Registration successful!");
            } else {
                // Registration failed, handle errors
                console.error("Registration failed");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className={styles["register-page"]}>
            <div className={styles["image-container"]}></div>
            <div className={styles["register-container"]}>
                <div className={styles["register-content"]}>
                    <header className={styles["register-header"]}>
                        <h1>Register</h1>
                        <p>Get started by creating your account</p>
                    </header>
                    <form className={styles["register-form"]} onSubmit={handleSubmit}>
                        <div className={styles["input-group"]}>
                            <label htmlFor="userTag">Username</label>
                            <input
                                type="text"
                                id="userTag"
                                value={userTag}
                                name="userTag"
                                placeholder="Enter your username"
                                onChange={(e) => setUserTag(e.target.value)}
                            />
                        </div>
                        <div className={styles["input-group"]}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                name="email"
                                placeholder="Enter your email"
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles["input-group"]}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                name="password"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles["input-group"]}>
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className={styles["register-button"]}>
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
