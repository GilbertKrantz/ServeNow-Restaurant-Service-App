import React, { useEffect, useState } from "react";
import Container from "../../layout/container";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase";

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
            <div className="w-[95%] mx-auto h-full">
                <div className="flex h-[10%] justify-evenly">
                    <input
                        className="rounded-full border-2 py-[5px] pr-10 pl-4 outline-none text-lg text-black"
                        placeholder="Search"
                        onChange={onHandleChangeSearch}
                        value={filter} 
                    />

                </div>
                
            </div>
        </Container>
    );
}

export default Menu;
