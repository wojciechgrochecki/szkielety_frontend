import { useState, useEffect } from 'react'
import PromotionThumbnail from '../PromotionThumbnail'
import axios from 'axios'
import style from './styles.module.css'
import { useAuth } from '../../../hooks/auth'
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

export default function PromotionList() {
    const [promotions, setPromotions] = useState([]);
    const { token } = useAuth();
    const { _id } = jwt_decode(token);
    const navigate = useNavigate();
    useEffect(() => {
        const url = "http://localhost:8080/api/promotion";

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.get(url, config)
            .then(response => {
                setPromotions(response.data);
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });

    }, []);

    function handleClick(promotionId) {
        const url = `http://localhost:8080/api/promotion/${promotionId}`;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.delete(url, config)
            .then(response => {
                console.log(response);
                setPromotions(promotions.filter(p => {
                    return p._id !== promotionId;
                }))
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });
    }

    return (
        <div className={style["promotion-list"]}>
            {promotions.map((promo) => {
                return (
                    <div className={style['promotion-wrap']}>
                        <Link to={`/singlePromotion/${promo._id}`} style={{ textDecoration: 'none' }}>
                            <PromotionThumbnail key={promo._id} promotion={promo} />
                        </Link>
                        {promo.userId === _id &&
                            <div className={style['buttons-wrap']}>
                                <button className={style["delete-button"]}
                                    onClick={() => handleClick(promo._id)}>
                                    Delete
                                </button>
                                <button className={style["edit-button"]}
                                    onClick={() => navigate(`/editPromotion/${promo._id}`)}>
                                    Edit
                                </button>
                            </div>
                        }
                    </div>

                )
            })}

        </div>

    )

}