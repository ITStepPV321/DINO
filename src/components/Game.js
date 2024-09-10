// Невеличка анексія тім-ліда
import { useEffect } from "react";
import Squirrel from "./Models/Squirrel";
import Score from "./Score";


// Юра + Семен = <3;    тут сама гра, логіка

export default function Game(){
    
    return(
        <div>
            {/* Невеличка анексія тім-ліда  */}
            <Score/>
            <Squirrel/>
        </div>
    )
}