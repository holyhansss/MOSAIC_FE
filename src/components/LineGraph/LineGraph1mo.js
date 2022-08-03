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

// S&P 500 지수 와 CMC 200 지수를 그래프로(한달)

function Index1mo() {
  const [time, setTime] = useState([]);
  const [res, setRes] = useState([]);

  var SNPOptions = {
    method: "GET",
    url: "https://yfapi.net/v8/finance/chart/^GSPC?comparisons=MSFT%2C%5EVIX&range=1mo&region=US&interval=1d&lang=en&events=div%2Csplit",

    params: {
      modules: "defaultKeyStatistics,assetProfile",
    },
    headers: {
      "x-api-key": process.env.REACT_APP_COIN_API_KEY,
    },
  };
  var CMCOptions = {
    method: "GET",
    url: "https://yfapi.net/v8/finance/chart/^CMC200?comparisons=MSFT%2C%5EVIX&range=1mo&region=US&interval=1d&lang=en&events=div%2Csplit",
    //   url: "https://yfapi.net/v8/finance/chart/GSPC?comparisons=MSFT%2C%5EVIX&range=1mo&region=US&interval=1d&lang=en&events=div%2Csplit",
    params: {
      modules: "defaultKeyStatistics,assetProfile",
    },
    headers: {
      "x-api-key": process.env.REACT_APP_COIN_API_KEY,
    },
  };

  async function getSNP() {
    let returnValue;
    await axios.request(SNPOptions).then((res: any) => {
      const IndexData = res.data.chart.result[0].indicators.quote[0].close.map(
        (data, index) =>
          data && {
            time: moment(
              res.data.chart.result[0].timestamp[index] * 1000
            ).format("MM월DD일"),
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
      for (const item of IndexData) {
        item.SnP = (100 / SNP_first) * item.SnP;
      }
      returnValue = IndexData;
    });
    return returnValue;
  }

  async function getCMC() {
    let returnValue;
    await axios.request(CMCOptions).then((res: any) => {
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
      for (const item of IndexData2) {
        item.CMC = (100 / CMC_first) * item.CMC;
      }
      returnValue = IndexData2;
    });

    return returnValue;
  }
  useEffect(() => {
    NewIndex();
  }, []);

  const NewIndex = async () => {
    const resTemp = [];
    const data1 = await getSNP();
    const data2 = await getCMC();
    console.log("data1:", data1);
    console.log("data2:", data2);

    for (let i = 0; i < data1.length; i++) {
      resTemp.push({
        time: data1[i].time,
        SnP: data1[i].SnP,
        CMC: data2[i].CMC,
      });
    }
    console.log("res: ", res);
    setRes(resTemp);
    return res;
  };
  return (
    <div>
      <div>
        <h>S&P 500 vs CMC200 1 Month ver </h>
      </div>

      {res && (
        <div>
          <LineChart
            width={900}
            height={300}
            data={res}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="time" />
            <YAxis domain={[80, 120]} />
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
export default Index1mo;
