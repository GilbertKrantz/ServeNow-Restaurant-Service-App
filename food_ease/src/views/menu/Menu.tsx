import React, { useState } from "react";
import Container from "../../layout/container";
import AiChatIcon from "../../assets/ai-chat-icon.svg";
import CartIcon from "../../assets/cart-icon.svg";
import { useNavigate } from 'react-router-dom'

function Menu() {
    const [filteredMenu, setFilteredMenu] = useState();
    const [allMenu, setAllMenu] = useState();
    const [filter, setFilter] = useState<string>('');
    const [isShowCart, setIsShowCart] = useState<boolean>(false);

    
    const onHandleChangeSearch = (e: any) => {
        e.preventDefault();
        setFilter(e.target.value);
    };
    const navigate = useNavigate();

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
