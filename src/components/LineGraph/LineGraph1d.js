import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { type } from "@testing-library/user-event/dist/type";
import { Typography } from "@mui/material";

// S&P 500 지수 와 CMC 200 지수를 그래프로(1일 기준)

function Index1d() {
  const [time, setTime] = useState([]);
  const [res, setRes] = useState([]);

  async function getSNP() {
    console.log("SNP");
    let returnValue;
    await axios.get("/v8/finance/chart/%5EGSPC").then((res: any) => {
      const IndexData = res.data.chart.result[0].indicators.quote[0].close.map(
        (data, index) =>
          data && {
            time: res.data.chart.result[0].timestamp[index],
            SnP: data,
          }
      );

      var SNP_first = IndexData[0].SnP;

      for (let i = 0; i < IndexData.length; i++) {
        if (IndexData[0] == null) {
          for (let j = 0; ; j++) {
            if (IndexData[j] == null) continue;
            IndexData[0] = IndexData[j];
            break;
          }
        } else if (IndexData[i] == null) {
          IndexData[i] = { time: null, SnP: null };
          IndexData[i].time = IndexData[i - 1].time + 60;
          IndexData[i].SnP = IndexData[i - 1].SnP;
          //IndexData2[i].CMC= ((IndexData2[i+1].CMC+IndexData2[i-1].CMC)/2) -  평균값일 경우
        } else {
        }
      }

      for (let i = 0; i < IndexData.length; i++) {
        IndexData[i].SnP = (100 / SNP_first) * IndexData[i].SnP;
        IndexData[i].time = moment(IndexData[i].time * 1000).format("HH:mm");
      }
      returnValue = IndexData;
    });
    return returnValue;
  }

  async function getCMC() {
    console.log("CMC");
    let returnValue;
    await axios.get("/v8/finance/chart/%5ECMC200").then((res: any) => {
      const IndexData2 = res.data.chart.result[0].indicators.quote[0].close.map(
        (data, index) =>
          data && {
            time: res.data.chart.result[0].timestamp[index],
            CMC: data,
          }
      );

      var CMC_first = IndexData2[0].CMC;

      for (let i = 0; i < IndexData2.length; i++) {
        if (IndexData2[0] == null) {
          for (let j = 0; ; j++) {
            if (IndexData2[j] == null) continue;
            IndexData2[0] = IndexData2[j];
            break;
          }
        } else if (IndexData2[i] == null) {
          IndexData2[i] = { time: null, CMC: null };
          IndexData2[i].time = IndexData2[i - 1].time + 60;
          IndexData2[i].CMC = IndexData2[i - 1].CMC;
          //IndexData2[i].CMC= ((IndexData2[i+1].CMC+IndexData2[i-1].CMC)/2) -  평균값일 경우
        } else {
        }
      }

      for (let i = 0; i < IndexData2.length; i++) {
        IndexData2[i].CMC = (100 / CMC_first) * IndexData2[i].CMC;
        IndexData2[i].time = moment(IndexData2[i].time * 1000).format("HH:mm");
      }

      returnValue = IndexData2;
    });
    return returnValue;
  }

  useEffect(() => {
    console.log("UseEffect line graph 1d triggered");
    NewIndex();
  }, []);

  const NewIndex = async () => {
    const resTemp = [];
    const data1 = await getSNP();
    const data2 = await getCMC();
    console.log("In NewIndex!");
    console.log("data1:", data1);
    console.log("data2:", data2);

    for (let i = 0; i < data1.length; i++) {
      let CMC;
      if (data2[i] == null) {
        CMC = 7;
      } else {
        if (data2[i].CMC == null) CMC = 7;
        CMC = data2[i].CMC;
      }
      resTemp.push({
        time: data1[i].time,
        SnP: data1[i].SnP,
        CMC: CMC,
      });
    }
    console.log("res: ", res);
    setRes(resTemp);
    return res;
  };

  return (
    <div>
      {res && (
        <div>
          <LineChart
            width={900}
            height={300}
            data={res}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="time" domain={["22:30", "05:00"]} />
            <YAxis domain={[70, 130]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="SnP" stroke="#8884d8" dot={false} />
            <Line type="monotone" dataKey="CMC" stroke="#82ca9d" dot={false} />
          </LineChart>
        </div>
      )}
    </div>
  );
}

export default Index1d;
