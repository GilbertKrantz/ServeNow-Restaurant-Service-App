import React, { useEffect, useState } from "react";
import Container from "../../layout/container";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase";
import AiChatIcon from "../../assets/ai-chat-icon.svg";
import CartIcon from "../../assets/cart-icon.svg";
import AllMenuIcon from "../../assets/all-menu-icon.svg";
import DessertIcon from "../../assets/dessert-icon.svg";
import DrinksIcon from "../../assets/drinks-icon.svg";
import sidesIcon from "../../assets/sides-icon.svg";
import PastaIcon from "../../assets/dessert-icon.svg";
import PizzaIcon from "../../assets/dessert-icon.svg";
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import MenuCard from "./components/menu_card/MenuCard";
import { IMenu } from "../../interfaces/Menu.interfaces";
import _ from "lodash";
import { ICart, IShowCart } from "./components/cart/Cart.interfaces";
import Cart from "./components/cart/Cart";

function Menu() {
    const [filteredMenu, setFilteredMenu] = useState<IMenu[]>([]);
    const [allMenu, setAllMenu] = useState<IMenu[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [isShowCart, setIsShowCart] = useState<boolean>(false);
    const [categoryList, setCategoryList] = useState<string[]>(['All', 'Pizza', 'Pasta', 'Drinks', 'Desserts', 'sides']);
    const [category, setCategory] = useState<string>('All');
    const [index, setIndex] = useState(0);
    const [cartItems, setCartItems] = useState<IShowCart[]>([]);
    const [cart, setCart] = useState<ICart[]>([]);

    const navigate = useNavigate();

    // BUAT AMBIL MENU
    const getMenu = async () => {
        const querySnapshot = await getDocs(collection(db, "menu"));
        const menus = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setAllMenu(menus);
    };

    useEffect(() => {
        getMenu();

        const cartData = localStorage.getItem('cart')
        if (cartData) {
            const currCartData: ICart[] = JSON.parse(cartData);
            setCart(currCartData)
        }
    }, []);

    // Complete FILTER
    useEffect(() => {
        const applyFilters = () => {
            // Filter by name (text search)
            let filtered = allMenu.filter(menu => 
                menu.name.toLowerCase().includes(filter.toLowerCase())
            );

            // Filter by category (if not 'all')
            if (category !== 'All') {
                filtered = filtered.filter(menu => menu.category === category);
            }

            setFilteredMenu(filtered);
        };

        // Apply filters whenever `filter` or `category` changes
        applyFilters();
    }, [filter, category, allMenu]);

    const onHandleChangeSearch = (e: any) => {
        e.preventDefault();
        setFilter(e.target.value);
    };

    const onHandleCloseCart = () => {
        setIsShowCart(false);
    }



    return (
        <Container>
            <div className="w-full mx-auto h-full py-[13%]">
                {/* SEARCH, AI CHAT< CART*/}
                <div className="flex h-[9%] justify-evenly pl-[6%] w-[95%]">
                    <input
                        className="rounded-full border-2 drop-shadow-md shadow-md pr-8 pl-4 py-0 h-[90%] outline-none text-small text-black cursor-pointer"
                        placeholder="Search"
                        onChange={onHandleChangeSearch}
                        value={filter} 
                    />
                    <img 
                        src={AiChatIcon} 
                        alt="" 
                        className="w-[18%] cursor-pointer" 
                        onClick={() => navigate("/chatbot")}
                    />
                    <img 
                        src={CartIcon}
                        alt=""
                        className="w-[18%] cursor-pointer"
                        onClick={() => setIsShowCart(true)} 
                    />
                </div>
                
                {/* LIST MENU*/}
                <div className="bg-[#FFB0B0] mt-[5%] w-full h-[97vh] pt-[5%] rounded-t-3xl">
                    {/* MENU CATEGORY LIST */}
                    <div className="flex font-semibold text-xs items-center text-[#FFF7D1] rounded-full justify-center">
                    {categoryList.map((c, idx) => (
                        <motion.div
                            initial={{ x: 0 }}
                            animate={{ x: index === idx ? 0 : 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            onClick={() => {
                                setIndex(idx)
                                setCategory(c)
                            }}
                            className={`cursor-pointer rounded-full px-3 py-3 w-[16%] flex justify-center items-center flex-col ${
                                index === idx ? "bg-[#F5F5F5] text-[#FFD09B]" : ""
                            }`}
                            key={idx}
                        >
                            <img src={PastaIcon} alt="" className="w-[4rem]"/>
                            {c}
                        </motion.div>
                    ))}
                    </div>

                    {/* MENU LIST */}
                    <div className="bg-[#F5F5F5] mt-[5%] w-full h-[97vh] p-[5%] rounded-t-3xl ">
                        {filteredMenu.length === 0 ?
                            <p className='text-center'>There is no menu</p>
                            : filteredMenu.map((menu: IMenu) => (
                            <MenuCard menu={menu} id={menu.id}/>
                        ))}
                    </div>
                </div>
                
            </div>

            {isShowCart &&
                <motion.div
                    className="fixed top-0 right-0 h-full bg-[#FFD6D6] shadow-lg w-[80%] p-4 z-50 rounded-l-3xl"
                    initial={{ x: "100%" }}
                    animate={{ x: isShowCart ? "0%" : "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <Cart cartItems={cartItems} onHandleCloseCart={onHandleCloseCart}/>
                </motion.div>
            }
        </Container>
    );
}


export default Menu;
