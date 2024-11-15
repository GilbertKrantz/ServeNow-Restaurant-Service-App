import React, { useEffect, useState } from "react";
import Container from "../../layout/container";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase";
import AiChatIcon from "../../assets/ai-chat-icon.svg";
import CartIcon from "../../assets/cart-icon.svg";
import { useNavigate } from 'react-router-dom'

function Menu() {
    const [filteredMenu, setFilteredMenu] = useState<{ id: string; [key: string]: any }[]>([]);
    const [allMenu, setAllMenu] = useState<{ id: string; [key: string]: any }[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [isShowCart, setIsShowCart] = useState<boolean>(false);
    const [category, setCategory] = useState<string>('all');

    
    const onHandleChangeSearch = (e: any) => {
        e.preventDefault();
        setFilter(e.target.value);
    };
    const navigate = useNavigate();

    // BUAT AMBIL MENU
    const getMenu = async () => {
        const querySnapshot = await getDocs(collection(db, "menu"));
        const menus = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setAllMenu(menus);
    };

    useEffect(() => {
        getMenu();
        console.log(allMenu);
    }, []);

    // SEARCH FILTER
    useEffect(() => {
        if (filter === '') {
            setFilteredMenu(allMenu);
        } else {
            const filtered = allMenu.filter(menu => menu.name.toLowerCase().includes(filter.toLowerCase()));
            setFilteredMenu(filtered);
            console.log(filtered);
        }
    }, [filter, allMenu]);

    // CATEGORY FILTER (UNTested)
    useEffect(() => {
        if (category === 'all') {
            setFilteredMenu(allMenu);
        } else {
            const filtered = allMenu.filter(menu => menu.category === category);
            setFilteredMenu(filtered);
        }
    }, [category, allMenu]);


    return (
        <Container>
            <div className="w-[98%] mx-auto h-full">
                <div className="flex h-[10%] justify-evenly">
                    <input
                        className="rounded-full border-2 drop-shadow-md shadow-md pr-8 pl-4 py-0 h-[90%] outline-none text-small text-black cursor-pointer"
                        placeholder="Search"
                        onChange={onHandleChangeSearch}
                        value={filter} 
                    />
                    <img src={AiChatIcon} alt="" className="w-[18%] cursor-pointer" onClick={() => navigate("/chatbot")}/>
                    <img src={CartIcon} alt="" className="w-[18%] cursor-pointer"/>
                </div>
                
                <div>
                    
                </div>
            </div>
        </Container>
    );
}


export default Menu;
