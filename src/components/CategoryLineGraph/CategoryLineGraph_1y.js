import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { type } from '@testing-library/user-event/dist/type';

// import { type } from '@testing-library/user-event/dist/type/index.js';
// import {get_coins_specific_category, return_calculated_prices} from '../../datafetching/queries.js'


function CategoryLineGraph_1y( props ) {  
  const dateRange= props.dateRange;
  const categoryArray= props.categoryArray;

  console.log("dateRange should not be null", dateRange);
  console.log("categoryArray should not be null", categoryArray);

  const [datesAndPrices, setDatesAndPrices] = useState([])
  const [minMax, setMinMax] = useState([])

  useEffect(() => {
    console.log("1yyyyyyy"); 
    getCategoryData_1yr();
  }, []);
    
  
  const getCategoryData_1yr = async () => {
    const response = await axios.get('http://localhost:5000/market/category/1yr',
      {params: {dateRange: dateRange, categoryArray: categoryArray}}
    )
    const thisResponse = response.data;
    console.log(thisResponse);
    setDatesAndPrices(thisResponse[0])
    console.log("this response 1y min max: ", thisResponse[1]);
    console.log("this response 1y min max in int : ", parseInt(thisResponse[1][0]), parseInt(thisResponse[1][1]));
    setMinMax([parseInt(thisResponse[1][0]), parseInt(thisResponse[1][1])])
  }

  
    return(
        <div style={{ width: "300px;", height: "200px;" }}>
          <div><h>Category data {dateRange} ver </h></div>
        { 
           datesAndPrices &&
           <div> 
           {/* <ResponsiveContainer width="100%" height="100%"> */}
            <LineChart
              width={900}
              height={300}
              data={datesAndPrices}
              margin={{top: 5, right: 20, left: 20, bottom: 5}}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="time" />
              <YAxis type="number" domain={minMax} />
              {/* <YAxis /> */}

              <Tooltip />
              <Line type="monotone" dataKey="Currency" stroke="green" dot={false}/>
              <Line type="monotone" dataKey="Smart Contract Platform" stroke="grey" dot={false}/>
              <Line type="monotone" dataKey="Computing"  stroke="skyblue" dot={false}/>
              <Line type="monotone" dataKey="DeFi"  stroke="pink" dot={false}/>
              <Line type="monotone" dataKey="Culture & Entertainment" stroke="orange" dot={false}/>
            </LineChart>
          {/* </ResponsiveContainer> */}
           </div>
         } 
      </div>
      
      );
}

export default CategoryLineGraph_1y;