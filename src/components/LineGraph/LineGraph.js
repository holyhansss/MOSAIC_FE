import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { type } from '@testing-library/user-event/dist/type';


// S&P 500 지수 와 CMC 200 지수를 그래프로

function Index() {
  const axios = require('axios');
  const [time, setTime] = useState([]);
  const [index1, setIndex1] = useState([]);
  const [index2, setIndex2] = useState([]);


  
  

  useEffect(() => {
    axios.get('/v8/finance/chart/%5EGSPC')
    .then((res: any) => {

      
      const IndexData = res.data.chart.result[0].indicators.quote[0].close.map((data, index) => (
        data && {
          time:moment(res.data.chart.result[0].timestamp[index]*1000).format('HH:mm'),
          SnP: data
      
          
        }));
       
       var SNP_first=IndexData[0].SnP
        for (const item of IndexData){
             
            item.SnP=100/SNP_first*item.SnP
            
            //console.log(item)
            
        }
        
        
        setIndex1(IndexData)
       
     
  });

  axios.get('/v8/finance/chart/%5ECMC200')
    .then((res: any) => {

      
      const IndexData2 = res.data.chart.result[0].indicators.quote[0].close.map((data, index) => (
        data && {
          time: res.data.chart.result[0].timestamp[index],
          CMC: data
          
        }));
        var CMC_first=IndexData2[0].CMC

          for (let i=0;i<IndexData2.length; i++){
            if (IndexData2[i] == null){
                  
                  IndexData2[i]= {time: null, CMC: null};
                  IndexData2[i].time = IndexData2[i-1].time+60;
                  IndexData2[i].CMC= ((IndexData2[i+1].CMC+IndexData2[i-1].CMC)/2)
              }
              else{  
              };  
          }
          
      for (let i=0;i<IndexData2.length; i++){
        IndexData2[i].CMC=100/CMC_first*IndexData2[i].CMC
        IndexData2[i].time=moment(res.data.chart.result[0].timestamp[IndexData2]*1000).format('HH:mm')
            
      }
      

      setIndex2(IndexData2);
          
        });
          
        
  }, []);

   

  return(

    
    <div>
      <div><h>S&P 500 vs CMC200  1 day ver (22:30~05:00)</h></div>
    { 
      index1 &&
      <div>
      <LineChart
        width={900}
        height={300}
        data={index1}
        margin={{top: 5, right: 20, left: 20, bottom: 5}}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="time" domain={["22:30", "05:00"]}/>
        <YAxis domain={[70, 130]}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="SnP" data={index1} stroke="#8884d8" dot={false}/>
        <Line type="monotone" dataKey="CMC" data={index2} stroke="#82ca9d" dot={false}/>
        
        
      </LineChart>
    </div>
      
    }
    
      
    
  </div>
  
  );
};

export default Index;


