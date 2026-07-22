import type { IProducts } from "./assets/types/types";
import React from "react";
import useCartStore from "./store/useCartStore";
import styles from './styles/CartItem.module.css'


interface ICardItemProps{
    product:IProducts;
}

const CartItem:React.FC<ICardItemProps> = ({product}) =>{
    const {toggleCart} = useCartStore()
    return(
        <div className={styles.cartItem}>
            <img src={product.image} alt={product.title} className={styles.image}/>

            <div className={styles.info}>
                <h3 className={styles.title}>{product.title}</h3>
                <p className={styles.price}>${product.price}</p>
                <p className={styles.count}>Осталось:{product.rating.count}</p>
            </div>

                <button className={styles.removeBtn}
                onClick={() => toggleCart(product)}
                >Удалить
                </button>
  
        </div>
    )
}

export default CartItem