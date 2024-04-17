import React, { useState } from "react";
import styles from "./Register.module.scss";
//import X_icon from '../../components/Icons/XIcon/XIcon';
import i18n from "../../i18n/i18n";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

const Register = ({ toastTC, toastTR}) => {
	const { t } = i18n;
	const [userTag, setUserTag] = useState("");
	const [email, setUserEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const header = <div className="font-bold mb-3">Pick a password</div>;
	const footer = (
		<>
			<Divider />
			<p className="mt-2">Suggestions</p>
			<ul className="pl-2 ml-2 mt-0 line-height-3">
				<li>At least one lowercase</li>
				<li>At least one uppercase</li>
				<li>At least one numeric</li>
				<li>Minimum 8 characters</li>
			</ul>
		</>
	);
	const handleSubmit = async (e) => {
		e.preventDefault();
    if (userTag === "" || password === "" || confirmPassword === "" || email === "") {
      toastTR.current.show({severity:'warn', summary: t('Warning'), detail:t("fill in all fields"), life: 3000});
      e.preventDefault();
      return;
  }

  if (password !== confirmPassword) {
      console.log("passwordDontmatch");
      toastTR.current.show({ severity: "error", summary: t("Error"), detail: t("Passwords do not match"), life: 3000 });
      e.preventDefault();
      return;
  }

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
        toastTC.current.show({severity:'success', summary: 'Success', detail:"Registration successful!", life: 3000});
			} else {
				// Registration failed, handle errors
        toastTR.current.show({severity:'error', summary: 'Error', detail:'Registration failed', life: 3000});
				console.error("Registration failed");
			}
		} catch (error) {
     toastTR.current.show({severity:'error', summary: 'Error', detail:'No internet connection', life: 3000});
			console.error("Error during registration:", error);
		}
	};

	return (
		<>
			<div className={styles["register-page"]}>
				<div className={styles["register-container"]}>
					<div className={styles["register-content"]}>
						<header className={styles["register-header"]}>
							<h1>{t("register")}</h1>

							<p>{t("Get started by creating your account")}</p>
						</header>
						<form className={styles["register-form"]} onSubmit={handleSubmit}>
							<div className={styles["input-group"]}>
								<span className="p-float-label">
									<InputText id="username" value={userTag} onChange={(e) => setUserTag(e.target.value)} />
									<label htmlFor="username">{t("Username")}</label>
								</span>
							</div>
							<div className={styles["input-group"]}>
								<span className="p-float-label">
									<InputText id="username" value={email} onChange={(e) => setUserEmail(e.target.value)} />
									<label htmlFor="username">{t("Email")}</label>
								</span>
							</div>
							<div className={styles["input-group"]}>
								<span className="p-float-label">
									<Password
										className={styles["password"]}
										inputId="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										header={header}
										footer={footer}
										toggleMask
									/>
									<label htmlFor="password">{t("Password")}</label>
								</span>
							</div>
							<div className={styles["input-group"]}>
								<span className="p-float-label">
									<Password
										className={`${styles["password"]} ${confirmPassword === password ? "p-invalid" : "p-invalid"}`}
										inputId="passwordConfirm"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										feedback={false}
                    toggleMask
									/>
									<label htmlFor="passwordConfirm">{t("Confirm password")}</label>
								</span>
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
