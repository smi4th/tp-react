import React from "react";
import meme from "@/assets/meme.jpg";
const FooterTroll: React.FC = () => {

    const handleClick = () => {
        window.location.href = "/";
    }

    return (
        <div className={"w-screen h-screen flex items-center justify-center bg-gray-100"}>
            <img src={meme} alt="Meme" className="w-full h-full object-cover" onClick={handleClick}/>
        </div>
    );
}
export default FooterTroll;