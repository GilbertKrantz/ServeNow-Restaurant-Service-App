import React, { useEffect, useState } from 'react'
import { ICart, IShowCart } from '../menu/components/cart/Cart.interfaces';
import { useNavigate } from "react-router-dom";

import BackIcon from "../../assets/back-icon-arrow.svg";
import { doc, getDoc } from 'firebase/firestore';
import db from '../../firebase';
import { IMenu } from '../../interfaces/Menu.interfaces';

function Checkout() {
    const navigate = useNavigate();

    const [total, setTotal] = useState<number>(0);

    const [cartItems, setCartItems] = useState<IShowCart[]>([]);
    const [cart, setCart] = useState<ICart[]>([]);

    useEffect(() => {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            const currCartData: ICart[] = JSON.parse(cartData);
            setCart(currCartData)
        }
    }, [])

    const getDatafromID = async (id: string) => {
        const docRef = doc(db, "menu", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return data;
        } else {
            console.log("No such document!");
        }
    }

    useEffect(() => {
        const fetchCartItems = async () => {
            const items = await Promise.all(cart.map(async (item) => {
                const data = await getDatafromID(item.id);
                return {
                    menu: data as IMenu,
                    count: item.count
                } as IShowCart;
            }));
            setCartItems(items);
        };

        fetchCartItems();
    }, [cart]);

    useEffect(() => {
        let subTotal = 0;
        cartItems.forEach((item: IShowCart) => {
            const itemTotalPrice = item.menu.price * item.count;
            subTotal += itemTotalPrice;
        })
        let taxFees = subTotal * 0.1;

        setTotal(subTotal + taxFees)
    }, [cartItems])


    const onHandlePayment = () => {
        // UNTUK CLEAR DATA DI LOCAL STORAGE KETIKA UDH PAYMENT
        localStorage.removeItem('cart');

        //kurang hit api untuk save data order
    }

    return (
        <div className='w-full mx-auto h-full bg-[#FFF7D1]'>
            {/* Header */}
            <div className="flex justify-around p-[10%]">
                <img
                    src={BackIcon}
                    alt=""
                    className="mr-[5%] cursor-pointer"
                    onClick={() => {
                        navigate(-1);
                    }}
                />
                <div className='mr-[21%]'>
                    <h1 className="text-[#FFB0B0] font-bold text-4xl">Payment</h1>
                </div>
            </div>
            {/* Body */}
            <div className="bg-white h-screen rounded-t-[2.5rem] gap-[2%] justify-center align-middle">
                {/* Order For */}
                <div className='flex flex-col pt-[10%] px-[10%]'>
                    <label className="font-semibold text-3xl" htmlFor='order_for'>Order For</label>
                    <div className="flex mt-[5%]">
                        <input type="text" id='order_for' name='order_for' title="Order For" placeholder="Nickname..." className="w-[100%] h-[2.5rem] rounded-full px-[1rem] bg-[#FFF7D1]" />
                    </div>
                </div>
                {/* Order Summary */}
                <div className='flex flex-col pt-[10%] px-[10%]'>
                    <label className="text-xl font-medium" htmlFor='order_summary'>Order Summary</label>
                    <div className='flex justify-between flex-row mt-[5%]'>
                        <div className='flex flex-col'>
                            {cartItems.map((item: IShowCart, index) => (
                                <div key={index} className='flex font-light'>
                                    <p>{item.menu.name}</p>
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-col pr-[10%]'>
                            {cartItems.map((item: IShowCart, index) => (
                                <div key={index} className='flex text-[#FFD09B] font-bold'>
                                    <p>{item.count} items</p>
                                </div>
                            ))}
                        </div>
                        {/* Total Price */}
                        <p className="font-bold self-center text-3xl text-[#FFD09B]">{total / 1000}K</p>
                    </div>
                    <hr className='border-[#FFD09B] mt-[5%]' />
                </div>
                {/* Payment Method */}
                {/* Lanjutin disini aja */}
                <div className='flex flex-col pt-[5%] px-[10%]'>
                    <label className="text-xl font-medium" htmlFor='payment_method'>Payment Method</label>
                </div>
            </div>
        </div>

    )
}

export default Checkout