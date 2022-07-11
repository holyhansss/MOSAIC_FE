import React from "react";
import FearandGreed from "../components/FearAndGreed/FearandGreed";
import Index from "../components/LineGraph/LineGraph";

// 시장동향
// S&P 500 지수와 CMC 200 그래프(line) 불러옴
//공포탐욕지수 이미지 불러옴
//카테고리별 그래프 불러옴
// 위너 코인 (카테고리별 ) 리스트 나타냄

function Marketpage() {
    return (
        <div>
            <h>Market Trends</h>
            <Index/>
            <FearandGreed/>
            
        </div>
    );
  };
export default  Marketpage;