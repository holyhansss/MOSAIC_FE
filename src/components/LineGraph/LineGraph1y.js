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
import { CustomTooltip } from "./LineGraph1d";
//Responsive Web
import {Pc, Mobile} from "../Responsive/Responsive";
// S&P 500 지수 와 CMC 200 지수를 그래프로(1년 기준)

function Index1y() {
  const [res, setRes] = useState([]);
  const [minMax, setMinMax] = useState([]);

  const getSNPCMC_1yr = async () => {
    const response = await axios.get("http://localhost:5000/market/snpcmc/1yr");
    for (let i = 0; i < response.data.length; i++) {
      response.data[i].Time = moment
        .unix(response.data[i].Time)
        .format("YYYY/MM/DD");
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

  useEffect(() => {
    getSNPCMC_1yr();
  }, []);
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
      <Mobile >
      {res && (
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer >
          <LineChart
            data={res}
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
              domain={[0, 200]}
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
          </ResponsiveContainer>
        </div>
      )}
      </Mobile>
    </div>
  );
}
export default Index1y;
