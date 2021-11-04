import styles from "./register.module.scss";
import Logo from "../../../assets/logo.svg";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className={styles.container}>
            <div className={styles.inputsPane}> 
                <img className={styles.logo} src={Logo}/>
                <div className={styles.inputsContainer}>
                    <span className={styles.title}>Sign up</span>
                    <div className={styles.input}>
                        <span className={styles.label}>Email</span>
                        <input type="email"></input>
                    </div>
                    <div className={styles.input}>
                        <span className={styles.label}>Password</span>
                        <input type="password"></input>
                    </div>
                    <div className={styles.input}>
                        <span className={styles.label}>Re-enter password</span>
                        <input type="password"></input>
                    </div>
                    <button>Next</button>
                </div>
                <div className={styles.signInContainer}>
                    <span>Already got an account? <Link to="/login">Sign in</Link></span>
                </div>
            </div>

            <div className={styles.infoPane}>

            </div>
        </div>
    )
}

export default Register;