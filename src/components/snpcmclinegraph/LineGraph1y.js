import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { type } from '@testing-library/user-event/dist/type';


// S&P 500 지수 와 CMC 200 지수를 그래프로(1년기준)

function Index1y() {
  const axios = require('axios');
  const [time, setTime] = useState([]);
  const [index1, setIndex1] = useState([]);
  const [index2, setIndex2] = useState([]);

  var SNPOptions = {
    method: 'GET',
    url: "https://yfapi.net/v8/finance/chart/^GSPC?comparisons=MSFT%2C%5EVIX&range=1y&region=US&interval=1d&lang=en&events=div%2Csplit",
 
    params: {

      modules: 'defaultKeyStatistics,assetProfile', 
  
  
  },
    headers: {
      'x-api-key': process.env.REACT_APP_COIN_API_KEY
    }
  };
  var CMCOptions = {
    method: 'GET',
    url: "https://yfapi.net/v8/finance/chart/^CMC200?comparisons=MSFT%2C%5EVIX&range=1y&region=US&interval=1d&lang=en&events=div%2Csplit",

    params: {

      modules: 'defaultKeyStatistics,assetProfile', 
  
  
  },
    headers: {
      'x-api-key': process.env.REACT_APP_COIN_API_KEY
    }
  };
  
  useEffect(() => {
    axios.request(SNPOptions)
    .then((res: any) => {


        const IndexData = res.data.chart.result[0].indicators.quote[0].close.map((data, index) => (
          data && {
            time:moment(res.data.chart.result[0].timestamp[index]*1000).format('YY년MM월'),
            SnP: data
        
            
          }))
          
        var SNP_first=IndexData[0].SnP
        for (let i=0;i<IndexData.length; i++){

          if (IndexData[0] == null ){
                
                for (let j = 0; ; j++) {
                  if (IndexData[j] == null)
                    continue;
                  IndexData[0]= IndexData[j];
                  break;
                }
                
                
            }
            else if (IndexData[i] == null  ) {
              IndexData[i]= {time: null, SnP: null};
              IndexData[i].time = IndexData[i-1].time+60;
              IndexData[i].SnP= IndexData[i-1].SnP
              //IndexData2[i].CMC= ((IndexData2[i+1].CMC+IndexData2[i-1].CMC)/2) -  평균값일 경우
            } 
            else{  
            };  
        }
        for (const item of IndexData){
                
            item.SnP=100/SNP_first*item.SnP
   
            }
            
            
            setIndex1(IndexData)
            
      });
      axios.request(CMCOptions)
      .then((res: any) => {
          const IndexData2 = res.data.chart.result[0].indicators.quote[0].close.map((data, index) => (
            data && {
              time:res.data.chart.result[0].timestamp[index],
              CMC: data
          
              
            }))
  
          var CMC_first=IndexData2[0].CMC
          for (let i=0;i<IndexData2.length; i++){

            if (IndexData2[0] == null ){
                  
                  for (let j = 0; ; j++) {
                    if (IndexData2[j] == null)
                      continue;
                    IndexData2[0]= IndexData2[j];
                    break;
                  }
                  
                  
              }
              else if (IndexData2[i] == null  ) {
                IndexData2[i]= {time: null, CMC: null};
                IndexData2[i].time = IndexData2[i-1].time+60;
                IndexData2[i].CMC= IndexData2[i-1].CMC
                //IndexData2[i].CMC= ((IndexData2[i+1].CMC+IndexData2[i-1].CMC)/2) -  평균값일 경우
              } 
              else{  
              };  
          }
          for (const item of IndexData2){
                  
              item.CMC=100/CMC_first*item.CMC
     
              }
              
              
              setIndex2(IndexData2)
              
        });
    }, []);
  return(

    
    <div>
      <div><h>S&P 500 vs CMC200  1 year ver </h></div>

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
        <XAxis dataKey="time"/>
        <YAxis domain={[80, 120]}/>
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
export default Index1y;


