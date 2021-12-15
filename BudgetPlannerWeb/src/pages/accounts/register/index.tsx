import styles from "./register.module.scss";
import Logo from "../../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { RegisterContext } from "./register-store";
import { observer } from "mobx-react";

const Register = () => {
    const {
        user,
        setEmail,
        setPassword,
        setConfirmPassword,
        register,
        reset
    } = useContext(RegisterContext);

    const navigate = useNavigate();

    useEffect(() => {
        return reset;
    }, [reset]);

    const onClickNext = async () => await register() && navigate("/login");
    
    return (
        <div className={styles.container}>
            <div className={styles.inputsPane}> 
                <img className={styles.logo} src={Logo} alt="ATAR" />
                <div className={styles.inputsContainer}>
                    <span className={styles.title}>Sign up</span>
                    <div className={styles.input}>
                        <span className={styles.label}>Email</span>
                        <input type="email" value={user.email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.input}>
                        <span className={styles.label}>Password</span>
                        <input type="password" value={user.password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className={styles.input}>
                        <span className={styles.label}>Re-enter password</span>
                        <input type="password" value={user.confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                    <button onClick={onClickNext}>Next</button>
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

export default observer(Register);