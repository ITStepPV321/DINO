import { useNavigate } from "react-router-dom"

export default function Menu(){
    const navigate = useNavigate();

    const PlayOnClick = () =>{
        navigate('/Game');
    }
// Семенова частина
    return(
        <div className="menu-container">
            <h1 className="menu-banner">Dino</h1>
            <button onClick={PlayOnClick} className="menu-button">►</button>
        </div>
    )
}