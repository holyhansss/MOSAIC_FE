import React ,{useState}from "react";

import FearandGreed from "../components/FearAndGreed/FearandGreed";
import Index1d from "../components/LineGraph/LineGraph1d";
import Index1mo from "../components/LineGraph/LineGraph1mo";
import Index1y from "../components/LineGraph/LineGraph1y";

// 시장동향
// S&P 500 지수와 CMC 200 그래프(line) 불러옴
//공포탐욕지수 이미지 불러옴
//카테고리별 그래프 불러옴
// 위너 코인 (카테고리별 ) 리스트 나타냄

function Marketpage() {
    const range = ["1d","1mo", "1y"];
    const [content, setContent] = useState(null);
    
    const buttonValueSetting = e => {
        if (e.target.name === "1d") {   
            setContent(0)
        } else if (e.target.name === "1mo") {
            setContent(1)
        } else if (e.target.name === "1y") {
            setContent(2)
        }
      };

    const selectComponent = [
        <Index1d />,
        <Index1mo />,
        <Index1y />,
    ];

      
      return (
        <div>
            <div>Market page</div>
          <div>
            
            { range.map((data, idx) => {
              return (
                <button onClick={buttonValueSetting} name={data} key={idx}>
                  {data}
                </button>
              );
            })}
          </div>
          
          {content !== null &&<div>{selectComponent[content]}</div>}
        </div>
        
      );
  };
export default  Marketpage;