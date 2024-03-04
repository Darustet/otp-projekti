import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";

function Register() {
  const [userTag, setUserTag] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

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
