import React, {useState} from "react";
import styles from "./Register.module.scss";

const Register = () => {
    const [userTag, setUserTag] = useState("");
    const [email , setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        // implement for Register button
    };

    return (
        <div className={styles["register-page"]}>
            <div className={styles["image-container"]}></div>
            {/* Container for the image */}
            <div className={styles["register-container"]}>
                <div className={styles["register-content"]}>
                    <header className={styles["register-header"]}>
                        <h1>Register new user</h1>
                        <p>Fill user information to register</p>
                    </header>
                    <form className={styles["register-form"]} onSubmit={handleSubmit}>
                        <div className={styles["input-group"]}>
                            <label htmlFor="userTag">Username</label>
                            <input
                                type="text"
                                id="usertag"
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
                            <label htmlFor="password">Confirm password</label>
                            <input
                                type="password"
                                id="password"
                                value={confirmPassword}
                                name="password"
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