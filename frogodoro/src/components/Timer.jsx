import { useEffect, useRef } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "./PlayButton";


export default function Timer() {
    return (
        <div className="w-75 h-75 font-jersey flex flex-col">            
            <CircularProgressbar value={60} text = {'09:40'} styles={buildStyles( {
                textColor: '#373737',
                pathColor: '#58AF79',
                trailColor: '#FFFFFF',
                textSize: '32px'
            })} />
        </div>
    )  
    

    
}