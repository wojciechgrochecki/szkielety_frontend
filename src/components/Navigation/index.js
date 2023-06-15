import { useState } from "react"
import styles from "./styles.module.css"
import Logo from '../../icons/logo.png'
import { useAuth } from '../../hooks/auth'
import { Link } from "react-router-dom";

export default function Navigation() {
    const { logout } = useAuth();

    return (
        <div className={styles["nav"]}>
            <div className={styles["navigation-container"]}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <div className={styles["logo"]}>
                        <img src={Logo} alt={"logo"} />
                        <span>Discount Heaven</span>
                    </div>
                </Link>
                <Link className={styles["add-promotion"]} to='/addPromotion'>
                    <div className={styles["nav-link"]}>Add promotion</div>
                </Link>
                <div className={styles["actions"]}>
                    <button onClick={logout}>Log out</button>
                </div>
            </div>
        </div>
    )


}