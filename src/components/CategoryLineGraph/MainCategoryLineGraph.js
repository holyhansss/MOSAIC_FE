import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { type } from '@testing-library/user-event/dist/type';

// import { type } from '@testing-library/user-event/dist/type/index.js';
// import {get_coins_specific_category, return_calculated_prices} from '../../datafetching/queries.js'

function MainCategoryLineGraph() {  
  const [datesAndPrices, setDatesAndPrices] = useState([])
  const [minMax, setMinMax] = useState([])

  useEffect(() => {
    const dateRange= "1mo";
    const categoryArray= [true, true, true, true, true]
    console.log("dateRange should not be null", dateRange);
    console.log("categoryArray should not be null", categoryArray);
  
    console.log("1mmmmmmonth");
    getCategoryData_1mo(dateRange, categoryArray);
  }, []);
  
  const getCategoryData_1mo = async (dateRange, categoryArray) => {

    const response = await axios.get('http://localhost:5000/market/category/1mo',
    {params: {dateRange: dateRange, categoryArray: categoryArray}}
    )
    const thisResponse = response.data;
    console.log(thisResponse);
    setDatesAndPrices(thisResponse[0])
    console.log("this response 1mo min max: ", thisResponse[1]);
    setMinMax([parseInt(thisResponse[1][0])-10, parseInt(thisResponse[1][1])+10])
  }


    return(
        <div>    
        { 
          datesAndPrices &&
          <div>
          <LineChart
            width={300}
            height={180}
            data={datesAndPrices}
            margin={{ top: 3, right: 1, left: 1, bottom: 1}}
          >
            <CartesianGrid vertical={false} horizontal={false}/>
            <XAxis dataKey="time" />
            <YAxis domain={minMax} wrapperStyle={{ width: 100, backgroundColor: '#ccc' }}/>
            <Tooltip />
            <Line type="monotone" dataKey="Currency" stroke="green" dot={false}/>
            <Line type="monotone" dataKey="Smart Contract Platform" stroke="grey" dot={false}/>
            <Line type="monotone" dataKey="Computing"  stroke="skyblue" dot={false}/>
            <Line type="monotone" dataKey="DeFi"  stroke="pink" dot={false}/>
            <Line type="monotone" dataKey="Culture & Entertainment" stroke="orange" dot={false}/>
            <Legend wrapperStyle={{fontSize: "9px"}}/>
            
          </LineChart>
        </div>
          
        }
        
      </div>
      
      );
}

export default MainCategoryLineGraph;