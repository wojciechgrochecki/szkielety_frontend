import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import styles from "./styles.module.css"
import { useAuth } from "../../hooks/auth"
import toast, { Toaster } from 'react-hot-toast'


export default function EditForm() {
    const { id } = useParams();
    const { token } = useAuth();
    const [formData, setFormData] = useState(
        {
            promotionUrl: "", title: "", description: "",
            startDate: "", endDate: "", oldPrice: "", newPrice: ""
        })
    const [error, setError] = useState("")
    const navigate = useNavigate();



    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
    }

    useEffect(() => {
        const url = `http://localhost:8080/api/promotion/${id}`;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.get(url, config)
            .then(response => {
                let { promotionUrl, title, description, newPrice, oldPrice, startDate, endDate } = response.data[0];
                startDate = new Date(startDate).toISOString().substr(0, 10);

                endDate = new Date(endDate).toISOString().substr(0, 10);

                const formData = {
                    promotionUrl,
                    title,
                    description,
                    newPrice,
                    oldPrice,
                    startDate,
                    endDate
                };
                setFormData(formData);
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const url = `http://localhost:8080/api/promotion/${id}`;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const res = await axios.patch(url, formData, config)
            console.log(res.data);
            if (res.status === 200) {
                let { promotionUrl, title, description, newPrice, oldPrice, startDate, endDate } = res.data;
                startDate = new Date(startDate).toISOString().substr(0, 10);
                endDate = new Date(endDate).toISOString().substr(0, 10);
                const formData = {
                    promotionUrl,
                    title,
                    description,
                    newPrice,
                    oldPrice,
                    startDate,
                    endDate
                };
                setFormData(formData);
                setError("");
                toast.success('Promotion Updated!');
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
                    <h1>Edit promotion</h1>
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
                    <div className={styles["action-buttons"]}>
                        <button type="button"
                            className={styles["cancel-button"]}
                            onClick={() => navigate('/')}>
                            Cancel
                        </button>
                        <button type="submit"
                            className={styles["submit-button"]}>
                            Save changes
                        </button>
                    </div>
                </form >
            </div>
            <Toaster />
        </div>
    )
}

