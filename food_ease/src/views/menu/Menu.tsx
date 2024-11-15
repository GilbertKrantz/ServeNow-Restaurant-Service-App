import React, { useState } from "react";
import Container from "../../layout/container";

function Menu() {
    const [filteredMenu, setFilteredMenu] = useState();
    const [allMenu, setAllMenu] = useState();
    const [filter, setFilter] = useState<string>('');
    const [isShowCart, setIsShowCart] = useState<boolean>(false);

    
    const onHandleChangeSearch = (e: any) => {
        e.preventDefault();
        setFilter(e.target.value);
    };

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
