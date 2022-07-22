import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { type } from '@testing-library/user-event/dist/type';

import {get_coins_specific_category, return_calculated_prices} from '../../datafetching/queries.js'

async function categoryGraphPlot() {
    const [index, setIndex] = useState([]);
    let prices = []

    let categories = 
    [
        [["Currency"],[]],                 
        [["Smart Contract Platform"] ,[]],
        [["Computing"] , []],
        [["DeFi"] , []],        
        [["Culture & Entertainment"] , []],
        [["Digitization"], []]
    ]

    for (let i=0; i<categories.length; i++){
        const thisCategoryCoins = await get_coins_specific_category(categories[i][0]);
        for (let j=0; j<thisCategoryCoins.length; j++) {
            categories[i][1].push(thisCategoryCoins[j].CoinSymbol)
        }
    }
    
    for (let i=0; i<categories.length; i++){
        console.log("loop number ", i);
        const currencyTableName = categories[i][0] + "_prices"
        const thisPrices = await return_calculated_prices(currencyTableName, categories[i][1])
        prices.push(thisPrices)
        
     }
     console.log(prices);

    return(
        <div>
          <div><h>Category data  1 Month ver </h></div>
    
        { 
          prices &&
          <div>
          <LineChart
            width={900}
            height={300}
            data={prices}
            margin={{top: 5, right: 20, left: 20, bottom: 5}}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="time"/>
            <YAxis domain={[80, 120]}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Currency" data={prices} stroke="#8884d8" dot={false}/>
            <Line type="monotone" dataKey="Smart Contract Platform" data={prices} stroke="#82ca9d" dot={false}/>
            
            
          </LineChart>
        </div>
          
        }
        
      </div>
      
      );
}


const getThisCategoryData = async () => {
    let categories = 
    [
        [["Currency"],[]],                 
        [["Smart Contract Platform"] ,[]],
        [["Computing"] , []],
        [["DeFi"] , []],        
        [["Culture & Entertainment"] , []],
        [["Digitization"], []]
        ]
    
    console.log("Hello");

    for (let i=0; i<categories.length; i++){
        const thisCategoryCoins = await get_coins_specific_category(categories[i][0]);
        for (let j=0; j<thisCategoryCoins.length; j++) {
            categories[i][1].push(thisCategoryCoins[j].CoinSymbol)
        }
    }
    // console.log(categories);
    
    for (let i=0; i<categories.length; i++){
        console.log("loop number ", i);
        const currencyTableName = categories[i][0] + "_prices"
        const prices = await return_calculated_prices(currencyTableName, categories[i][1])
        console.log(prices); 
     }

}

export default categoryGraphPlot;