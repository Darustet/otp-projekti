import style from "./Login.module.scss";

const Login = () => {
	return (
		<div className={style["login-container "]}>
			<h2>Login</h2>
			<div className={style["form-group"]}>
				<label htmlFor={"username"}></label>
				<input type="text" id="username" name="username" placeholder="Enter your username" />
			</div>

			<div className={style["form-group"]}>
				<label htmlFor="password">Password:</label>
				<input type="password" id="password" name="password" placeholder="Enter your password" />
			</div>

			<div className={style["form-group"]}>
				<button type="button">Login</button>
			</div>

			<div className="options">
				<a href="#">Register</a>
				<a href="#">Forgot password</a>
			</div>
		</div>
	);
};

export default Login;
