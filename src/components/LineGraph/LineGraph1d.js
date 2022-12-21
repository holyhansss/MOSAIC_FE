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
  ResponsiveContainer
} from "recharts";

//Responsive Web
import {Pc, Mobile} from "../Responsive/Responsive";
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

  const [minMax, setMinMax] = useState([]);

  const getSNPCMC_1d = async () => {
    const response = await axios.get("http://localhost:5000/market/snpcmc/1d");
    for (let i = 0; i < response.data.length; i++) {
      response.data[i].Time = moment
        .unix(response.data[i].Time)
        .format("hh:mm");
      response.data[i].SNP = Math.ceil(response.data[i].SNP * 100) / 100;
      response.data[i].CMC = Math.ceil(response.data[i].CMC * 100) / 100;
    }
    //console.log(response.data);
    setRes(response.data);

    let snp_minmax = [0, 0];
    let cmc_minmax = [0, 0];
    snp_minmax[0] = response.data
      .map((v) => v.SNP)
      .reduce((min, cur) =>
        Number(min) > Number(cur) ? Number(cur) : Number(min)
      );
    snp_minmax[1] = response.data
      .map((v) => v.SNP)
      .reduce((max, cur) =>
        Number(max) < Number(cur) ? Number(cur) : Number(max)
      );
    cmc_minmax[0] = response.data
      .map((v) => v.CMC)
      .reduce((min, cur) =>
        Number(min) > Number(cur) ? Number(cur) : Number(min)
      );
    cmc_minmax[1] = response.data
      .map((v) => v.CMC)
      .reduce((max, cur) =>
        Number(max) < Number(cur) ? Number(cur) : Number(max)
      );

    setMinMax([
      Math.min(snp_minmax[0], cmc_minmax[0]) - 1,
      Math.max(snp_minmax[1], cmc_minmax[1]) + 1,
    ]);
  };

  // async function getSNP() {
  //   let returnValue;
  //   await axios.get("/v8/finance/chart/%5EGSPC").then((res) => {
  //     const IndexData = res.data.chart.result[0].indicators.quote[0].close.map(
  //       (data, index) =>
  //         data && {
  //           time: res.data.chart.result[0].timestamp[index] + 32400,
  //           SnP: data,
  //         }
  //     );

  //     const maxSnp = Math.max.apply(
  //       null,
  //       res.data.chart.result[0].indicators.quote[0].close
  //     );
  //     console.log(maxSnp);
  //     if (maxSnp > maxData) {
  //       setMaxData(maxSnp);
  //     }

  //     var SNP_first = IndexData[0].SnP;

  //     for (let i = 0; i < IndexData.length; i++) {
  //       if (IndexData[0] == null) {
  //         for (let j = 0; ; j++) {
  //           if (IndexData[j] == null) continue;
  //           IndexData[0] = IndexData[j];
  //           break;
  //         }
  //       } else if (IndexData[i] == null) {
  //         IndexData[i] = { time: null, SnP: null };
  //         IndexData[i].time = IndexData[i - 1].time + 60;
  //         IndexData[i].SnP = IndexData[i - 1].SnP;
  //         //IndexData2[i].CMC= ((IndexData2[i+1].CMC+IndexData2[i-1].CMC)/2) -  평균값일 경우
  //       } else {
  //       }
  //     }

  //     for (let i = 0; i < IndexData.length; i++) {
  //       IndexData[i].SnP = (100 / SNP_first) * IndexData[i].SnP;
  //       IndexData[i].time = moment(IndexData[i].time * 1000).format("HH:mm");
  //       if (IndexData[i].SnP > maxData) {
  //         setMaxData(IndexData[i].SnP);
  //       }
  //       if (IndexData[i].SnP < minData) {
  //         setMinData(IndexData[i].SnP);
  //       }
  //     }

  //     returnValue = IndexData;
  //   });
  //   return returnValue;
  // }

  // async function getCMC() {
  //   let returnValue;
  //   await axios.get("/v8/finance/chart/%5ECMC200").then((res) => {
  //     const IndexData2 = res.data.chart.result[0].indicators.quote[0].close.map(
  //       (data, index) =>
  //         data && {
  //           time: res.data.chart.result[0].timestamp[index] + 32400,
  //           CMC: data,
  //         }
  //     );

  //     if (
  //       Math.max(res.data.chart.result[0].indicators.quote[0].close) > maxData
  //     ) {
  //       setMaxData(
  //         Math.max(res.data.chart.result[0].indicators.quote[0].close)
  //       );
  //     }

  //     var CMC_first = IndexData2[0].CMC;

  //     for (let i = 0; i < IndexData2.length; i++) {
  //       if (IndexData2[0] == null) {
  //         for (let j = 0; ; j++) {
  //           if (IndexData2[j] == null) continue;
  //           IndexData2[0] = IndexData2[j];
  //           break;
  //         }
  //       } else if (IndexData2[i] == null) {
  //         IndexData2[i] = { time: null, CMC: null };
  //         IndexData2[i].time = IndexData2[i - 1].time + 60;
  //         IndexData2[i].CMC = IndexData2[i - 1].CMC;
  //         //IndexData2[i].CMC= ((IndexData2[i+1].CMC+IndexData2[i-1].CMC)/2) -  평균값일 경우
  //       } else {
  //       }
  //     }

  //     for (let i = 0; i < IndexData2.length; i++) {
  //       IndexData2[i].CMC = (100 / CMC_first) * IndexData2[i].CMC;
  //       IndexData2[i].time = moment(IndexData2[i].time * 1000).format("HH:mm");
  //       if (IndexData2[i].CMC > maxData) {
  //         setMaxData(IndexData2[i].CMC);
  //       }
  //       if (IndexData2[i].CMC < minData) {
  //         setMinData(IndexData2[i].CMC);
  //       }
  //     }

  //     returnValue = IndexData2;
  //   });
  //   return returnValue;
  // }

  useEffect(() => {
    //NewIndex();
    getSNPCMC_1d();
  }, []);

  // const NewIndex = async () => {
  //   const resTemp = [];
  //   const data1 = await getSNP();
  //   const data2 = await getCMC();
  //   // console.log("In NewIndex!");
  //   // console.log("data1:", data1);
  //   // console.log("data2:", data2);

  //   for (let i = 0; i < data2.length; i++) {
  //     let CMC;
  //     if (data2[i] == null) {
  //       CMC = data2[i - 1].CMC;
  //     } else {
  //       if (data2[i].CMC == null);
  //       CMC = data2[i].CMC;
  //     }
  //     resTemp.push({
  //       time: data1[i].time,
  //       SnP: Math.ceil(data1[i].SnP * 100) / 100,
  //       CMC: Math.ceil(CMC * 100) / 100,
  //     });
  //   }
  //   console.log("res: ", res);
  //   setRes(resTemp);
  //   return res;
  // };

  return (
    <div>
      <Pc>
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
              dataKey="Time"
              minTickGap={60}
              tickSize={5}
              tickMargin={5}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickSize={5}
              domain={minMax}
              tickMargin={5}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              name="S&P"
              type="monotone"
              isAnimationActive={false}
              dataKey="SNP"
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
      </Pc>
      <Mobile>
      {res && (
        <div style={{ width: '100%', height: 300 }} >
          <ResponsiveContainer >
          <LineChart
            data={res}
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
              domain={minMax}
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
          </ResponsiveContainer>
        </div>
      )}
      </Mobile>
    </div>
  );
}

export default Index1d;
