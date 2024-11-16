import React, { useEffect, useState } from 'react'
import { ICart, IShowCart } from '../menu/components/cart/Cart.interfaces';
import Container from '../../layout/container';

function Checkout() {
    const [cartItems, setCartItems] = useState<IShowCart[]>([]);
    const [cart, setCart] = useState<ICart[]>([]);

    useEffect(() => {
        // const cartData = localStorage.getItem('cart');
        // if (cartData) {
        //     const currCartData: ICart[] = JSON.parse(cartData);
        //     setCart(currCartData)
        // }
    }, [])

    const onHandlePayment = () => {
        // UNTUK CLEAR DATA DI LOCAL STORAGE KETIKA UDH PAYMENT
        localStorage.removeItem('cart');

        //kurang hit api untuk save data order
    }

    return (
    <Container>
        {
            cart.map((item: ICart) => (
                <div>
                    {item.id} - {item.count}
                </div>
            ))
        }
    </Container>
    )
}

export default Checkout