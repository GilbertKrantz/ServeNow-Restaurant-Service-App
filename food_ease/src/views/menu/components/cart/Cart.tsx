import React from 'react';
import { CartProps, IShowCart } from './Cart.interfaces';

const Cart: React.FC<CartProps> = ({ cartItems, onHandleCloseCart }) => {
    return (
        <div className="flex justify-between items-center">
            {
                cartItems.map((item: IShowCart) => (
                <div>{item.menu.id}</div>
                ))
            }
        </div>
    );
};

export default Cart;




                    // <div className="flex justify-between items-center">
                    //     <h2 className="text-lg font-semibold">Cart</h2>
                    //     <button
                    //         onClick={() => setIsShowCart(false)} // Hide cart
                    //         className="text-lg font-bold"
                    //     >
                    //         X
                    //     </button>
                    // </div>

                    // {cartItems.length > 0 ? (
                    //     <div>
                    //         <p className="text-sm mt-4">
                    //             You have {cartItems.length} items in the cart
                    //         </p>
                    //         {cartItems.map((item, index) => (
                    //             <div key={index} className="flex justify-between mt-2">
                    //                 <span>{item.menu.id}</span>
                    //                 <span>{item.count}</span>
                    //             </div>
                    //         ))}
                    //         <button className="mt-4 w-full bg-[#FFB0B0] py-2 rounded-lg text-white">
                    //             Checkout
                    //         </button>
                    //     </div>
                    // ) : (
                    //     <div className="flex flex-col justify-center items-center h-full">
                    //         <p className="text-center text-lg">Your cart is empty</p>
                    //     </div>
                    // )}