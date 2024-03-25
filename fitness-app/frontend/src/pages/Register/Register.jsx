import React, { useState } from "react";
import styles from "./Register.module.scss";
//import X_icon from '../../components/Icons/XIcon/XIcon';
import i18n from "../../i18n/i18n";



const Register = () => {
  const { t } = i18n;
	const [userTag, setUserTag] = useState("");
	const [email, setUserEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registrationData = {
      userTag,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:4000/api/users", {
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
    <>
      <div className={styles["register-page"]}>
        <div className={styles["register-container"]}>
          <div className={styles["register-content"]}>
            {/*<div className={styles['xIconContainer']}>
              <X_icon color="black"/>
            </div>*/}
            <header className={styles["register-header"]}>
              <h1>{t("register")}</h1>

              <p>{t("Get started by creating your account")}</p>
            </header>
            <form className={styles["register-form"]} onSubmit={handleSubmit}>
              <div className={styles["input-group"]}>
                <label htmlFor="userTag">{t("Username")}</label>
                <input
                    type="text"
                    id="userTag"
                    value={userTag}
                    name="userTag"
                    placeholder= {t("Enter your username")}
                    onChange={(e) => setUserTag(e.target.value)}
                />
              </div>
              <div className={styles["input-group"]}>
                <label htmlFor="email">{t("Email")}</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    name="email"
                    placeholder= {t("Enter your email")}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
              <div className={styles["input-group"]}>
                <label htmlFor="password">{t("Password")}</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    name="password"
                    placeholder= {t("Enter your password")}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles["input-group"]}>
                <label htmlFor="confirmPassword">{t("Confirm password")}</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    name="confirmPassword"
                    placeholder= {t("Confirm your password")}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit" className={styles["register-button"]}>
                {t("register")}
              </button>
            </form>
          </div>
        </div>
      </div>
      </>
    
  );
};

export default Register;