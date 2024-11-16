import { IMenu } from "../../../../interfaces/Menu.interfaces";

export interface ICart {
    id: string;
    count: number;
}

export interface IShowCart {
    menu: IMenu;
    count: number;
}

export interface CartProps {
    cartItems: IShowCart[]; // Array of cart items
    onHandleCloseCart: () => void; // Function to close the cart
}