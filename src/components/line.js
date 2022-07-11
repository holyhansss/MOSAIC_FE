import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


// S&P 500 지수 그래프로

function SPIndex() {
  const axios = require('axios');
  const [time, setTime] = useState([]);
  const [index, setIndex] = useState([]);

  useEffect(() => {
    axios.get('/v8/finance/chart/%5EGSPC')
    .then((res: any) => {

      
      const IndexData = res.data.chart.result[0].indicators.quote[0].close.map((data, index) => (
        data && {
          time: moment(res.data.chart.result[0].timestamp[index]*1000).format('HH:mm'),
          SnP: data
          
        }));
      setIndex(IndexData)
      
  });
    
  }, []);

   

  return(

    
    <div>
      <h>S&P 500 vs CMC200</h>
    { 
      index &&
      <div>
      <LineChart
        width={900}
        height={300}
        data={index}
        margin={{top: 5, right: 20, left: 20, bottom: 5}}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="time" />
        <YAxis domain={[3600, 3900]}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="SnP" stroke="#8884d8" dot={false}/>
        
      </LineChart>
    </div>
      
    }
  </div>
  );
};

export default SPIndex;


