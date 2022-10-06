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

// S&P 500 지수 와 CMC 200 지수를 그래프로(1일 기준)

export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          borderRadius: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: 10,
        }}
      >
        <div style={{ color: "black", marginBottom: 5 }}>{label}</div>
        <div style={{ color: "#8884d8" }}>{`S&P : ${payload[0].value}`}</div>
        <div style={{ color: "#82ca9d" }}>{`CMC : ${payload[1].value}`}</div>
      </div>
    );
  }

  return null;
};

function Index1d() {
  const [res, setRes] = useState([]);
  const [maxData, setMaxData] = useState(0);
  const [minData, setMinData] = useState(1000);

  async function getSNP() {
    let returnValue;
    await axios.get("/v8/finance/chart/%5EGSPC").then((res) => {
      const IndexData = res.data.chart.result[0].indicators.quote[0].close.map(
        (data, index) =>
          data && {
            time: res.data.chart.result[0].timestamp[index] + 32400,
            SnP: data,
          }
      );

      const maxSnp = Math.max.apply(
        null,
        res.data.chart.result[0].indicators.quote[0].close
      );
      console.log(maxSnp);
      if (maxSnp > maxData) {
        setMaxData(maxSnp);
      }

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
        if (IndexData[i].SnP > maxData) {
          setMaxData(IndexData[i].SnP);
        }
        if (IndexData[i].SnP < minData) {
          setMinData(IndexData[i].SnP);
        }
      }

      returnValue = IndexData;
    });
    return returnValue;
  }

  async function getCMC() {
    let returnValue;
    await axios.get("/v8/finance/chart/%5ECMC200").then((res) => {
      const IndexData2 = res.data.chart.result[0].indicators.quote[0].close.map(
        (data, index) =>
          data && {
            time: res.data.chart.result[0].timestamp[index] + 32400,
            CMC: data,
          }
      );

      if (
        Math.max(res.data.chart.result[0].indicators.quote[0].close) > maxData
      ) {
        setMaxData(
          Math.max(res.data.chart.result[0].indicators.quote[0].close)
        );
      }

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
        if (IndexData2[i].CMC > maxData) {
          setMaxData(IndexData2[i].CMC);
        }
        if (IndexData2[i].CMC < minData) {
          setMinData(IndexData2[i].CMC);
        }
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
    // console.log("In NewIndex!");
    // console.log("data1:", data1);
    // console.log("data2:", data2);

    for (let i = 0; i < data2.length; i++) {
      let CMC;
      if (data2[i] == null) {
        CMC = data2[i - 1].CMC;
      } else {
        if (data2[i].CMC == null);
        CMC = data2[i].CMC;
      }
      resTemp.push({
        time: data1[i].time,
        SnP: Math.ceil(data1[i].SnP * 100) / 100,
        CMC: Math.ceil(CMC * 100) / 100,
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
            width={1000}
            height={300}
            data={res}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid opacity={0.4} />
            <XAxis
              dataKey="time"
              minTickGap={60}
              tickSize={5}
              tickMargin={5}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickSize={5}
              domain={[Math.floor(minData), Math.ceil(maxData)]}
              tickMargin={5}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              name="S&P"
              type="monotone"
              isAnimationActive={false}
              dataKey="SnP"
              stroke="#8884d8"
              dot={false}
            />
            <Line
              type="monotone"
              isAnimationActive={false}
              dataKey="CMC"
              stroke="#82ca9d"
              dot={false}
            />
          </LineChart>
        </div>
      )}
    </div>
  );
}

export default Index1d;
