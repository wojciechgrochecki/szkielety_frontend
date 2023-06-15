import { useState } from 'react'
import styles from '../Login/Login.module.css'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function RegistrationForm() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/user"
            const { data: res } = await axios.post(url, formData)
            navigate("/login")
            console.log(res.message)
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }

    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
    }


    return (<>
        <div className={styles["form-container"]}>
            <h1>Create Your New Account</h1>
            <form className={styles["form"]} onSubmit={handleSubmit}>
                <div >
                    <h3>Username</h3>
                    <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div >
                    <h3>Email</h3>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div >
                    <h3>Password</h3>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />
                </div>
                {error && <div
                    className={styles["error-message"]}>{error}</div>}
                <button type="submit"
                    className={styles["submit-button"]}>
                    Register
                </button>
            </form>
            <div className={styles['link-wrap']}>
                Already have an account? <Link to='/login' style={{ textDecoration: 'none' }}><div className={styles["register-link"]}>Log in</div></Link>
            </div>
        </div>
    </>)
}