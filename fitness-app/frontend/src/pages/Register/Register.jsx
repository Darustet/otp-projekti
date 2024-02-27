import React, {useState} from "react";
import styles from "./Register.module.scss";

const Register = () => {
    const [userTag, setUserTag] = useState("");
    const [email , setUserEmail] = useState("");
    const [password, setPassword] = useState("");

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
                                value={password}
                                name="password"
                                placeholder="Confirm your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className={styles["register-button"]}>
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
        /*
        <>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Register Page</title>
            <link rel="stylesheet" href={styles.container} />

            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <h1>Register</h1>
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
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
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
        */
    );
};

export default Register;