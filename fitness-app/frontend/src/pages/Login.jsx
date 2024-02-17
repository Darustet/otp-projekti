import '../login.css'

const Login = () => {
    return(
        <div className="login-container">
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor={"username"}></label>
                <input type="text" id="username" name="username"
                       placeholder="Enter your username"/>
            </div>

            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password"
                       placeholder="Enter your password"/>
            </div>

            <div className="form-group">
                <button type="button">Login</button>
            </div>

            <div className="options">
                <a href="#">Register</a>
                <a href="#">Forgot password</a>
            </div>
        </div>
    );
}

export default Login;
