import styles from "../register/register.module.scss";
import Logo from "../../../assets/logo.svg";
import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { LoginContext } from "./login-store";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const { user, setEmail, setPassword, reset, login } =
		useContext(LoginContext);

	useEffect(() => {
		return reset;
	}, [reset]);

	const navigate = useNavigate();

	const onClickNext = async () => await login() && navigate("/");

	return (
		<div className={styles.container}>
			<div className={styles.inputsPane}>
				<img className={styles.logo} src={Logo} alt="ATAR" />
				<div className={styles.inputsContainer}>
					<span className={styles.title}>Sign in</span>
					<div className={styles.input}>
						<span className={styles.label}>Email</span>
						<input
							type="email"
							value={user.email}
							onChange={(e) => setEmail(e.target.value)}
						></input>
					</div>
					<div className={styles.input}>
						<span className={styles.label}>Password</span>
						<input
							type="password"
							value={user.password}
							onChange={(e) => setPassword(e.target.value)}
						></input>
					</div>
					<button onClick={onClickNext}>Next</button>
				</div>
				<div className={styles.signInContainer}>
					<span>
						Don't have an account? <Link to="/register">Sign up</Link>
					</span>
				</div>
			</div>

			<div className={styles.infoPane}></div>
		</div>
	);
};

export default observer(Login);
