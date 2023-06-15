import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import styles from "./styles.module.css"
import { useAuth } from "../../hooks/auth"
import toast, { Toaster } from 'react-hot-toast'


export default function PromotionAddForm() {
    const { token } = useAuth();
    const [formData, setFormData] = useState(
        {
            promotionUrl: "", title: "", description: "",
            startDate: "", endDate: "", oldPrice: "", newPrice: ""
        })
    const [error, setError] = useState("")


    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const url = "http://localhost:8080/api/promotion";
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const res = await axios.post(url, formData, config)
            if (res.status === 201) {
                setError("");
                setFormData({
                    promotionUrl: "", title: "", description: "",
                    startDate: "", endDate: "", oldPrice: "", newPrice: ""
                });
                toast.success('Promotion posted!');
            }
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
    return (
        <div className={styles["form-container"]}>
            <div className={styles["form-wrap-card"]}>
                <form className={styles["form"]}
                    onSubmit={handleSubmit}>
                    <h1>Add new promotion</h1>
                    <div>
                        <h3>Link</h3>
                        <input
                            type="url"
                            name="promotionUrl"
                            onChange={handleChange}
                            value={formData.promotionUrl}
                            required
                            placeholder="http://www.example.com/..."
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <h3>Title</h3>
                        <input
                            type="text"
                            name="title"
                            onChange={handleChange}
                            value={formData.title}
                            required
                            placeholder="Short title to describe promotion"
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <h3>Description</h3>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter promotion description..."
                            rows={8}
                            cols={40}
                            required
                        />
                    </div>
                    <div>
                        <h3>Old price</h3>
                        <input
                            type="number"
                            name="oldPrice"
                            onChange={handleChange}
                            placeholder="0,00"
                            min="0"
                            step="0.01"
                            value={formData.oldPrice}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div>
                        <h3>New price</h3>
                        <input
                            type="number"
                            name="newPrice"
                            onChange={handleChange}
                            value={formData.newPrice}
                            placeholder="0,00"
                            min="0"
                            step="0.01"
                            className={styles.input}
                            required
                        />
                    </div>
                    <div>
                        <h3>Start date</h3>
                        <input
                            type="date"
                            name="startDate"
                            onChange={handleChange}
                            value={formData.startDate}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div>
                        <h3>End date</h3>
                        <input
                            type="date"
                            name="endDate"
                            onChange={handleChange}
                            value={formData.endDate}
                            className={styles.input}
                            required
                        />
                    </div>
                    {error && <div className={styles["error-message"]}>{error}</div>}
                    <button type="submit"
                        className={styles["submit-button"]}>
                        Add promotion
                    </button>
                </form >
            </div>
            <Toaster />
        </div>
    )
}

