import React, { useState } from "react";
import styles from "./Register.module.scss";
import X_icon from "../../components/Icons/XIcon/X_icon";

const Register = () => {
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
      confirmPassword,
    };
    // Rekisteröinnin käsittelyn logiikka tähän...
  };

  return (
    <div className={styles["register-page"]}>
      <div className={styles["image-container"]}>
        {/* Kuvakontti */}
      </div>
      <div className={styles["register-container"]}>
        <div className={styles["register-content"]}>
          <header>
            <h1>Register</h1>
            <p>Create your account</p>
          </header>
          <form onSubmit={handleSubmit} className={styles["register-form"]}>
            {/* Lomakkeen sisältö */}
          </form>
          <Link to="/login" className={styles["sign-in-link"]}>Already have an account? Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;