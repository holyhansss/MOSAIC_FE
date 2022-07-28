import axios from "axios";
import React, {useState, useEffect} from "react";


//공포탐욕지수
function FearandGreed() {
    const [FearNGreed, setFearNGreed] = useState([]);
    const getFeerNGreed =async()=>{
        const response =await axios.get('https://api.alternative.me/fng/');
        console.log(response.data);
        setFearNGreed(response.data);

    }
    useEffect(() => {       
        getFeerNGreed();
      }, []);
    return (
        <>
            {
                FearNGreed.data && (
                    <div>
                        <h>공포탐욕지수</h>
                        <img src="https://alternative.me/crypto/fear-and-greed-index.png"  alt="Latest Crypto Fear & Greed Index" />
                        <div>{FearNGreed.data.map((f, index) => <div key={index}>{f.value}</div>)}</div> 
                    </div>
                )
            }
        </>      
    );
  };
export default FearandGreed;