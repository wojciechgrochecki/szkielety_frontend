import { useState, useEffect } from 'react'
import styles from './styles.module.css'
import axios from "axios"

export default function PromotionThumbnail({ promotion }) {
    //console.log(promotion);


    return (
        <div className={styles["card"]}>
            <div className={styles["image-container"]}>
                <img src="https://placehold.co/150x150" alt={''} />
            </div>
            <div className={styles["details-container"]}>
                <div className={styles["title"]}>{promotion.title}</div>
                <div className={styles["price"]}>
                    <span className={styles["new-price"]}>{promotion.newPrice}zł</span>
                    <del className={styles["old-price"]}>{promotion.oldPrice}zł</del>
                </div>
                <div className={styles["description"]}>{promotion.description}</div>
                <div className={styles["promo-link"]} onClick={(e) => e.stopPropagation()}><a href={promotion.promotionUrl} target="_blank">Check link</a></div>
            </div>
        </div>
    )
}