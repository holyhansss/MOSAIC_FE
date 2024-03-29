import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
//Responsive Web
import {Pc, Mobile} from "../Responsive/Responsive";
import { CustomTooltip } from "./CategoryLineGraph_1d";

function CategoryLineGraph_1y(props) {
  const dateRange = props.dateRange;
  const categoryArray = props.categoryArray;

  const [datesAndPrices, setDatesAndPrices] = useState([]);
  const [minMax, setMinMax] = useState([]);

  useEffect(() => {
    getCategoryData_1yr();
  }, []);

  const getCategoryData_1yr = async () => {
    const response = await axios.get(
      "http://localhost:5000/market/category/1yr",
      { params: { dateRange: dateRange, categoryArray: categoryArray } }
    );
    const thisResponse = response.data;

    // 각 섹터의 최솟값, 최댓값을 저장하는 array
    let currency = [];
    let smart = [];
    let computing = [];
    let defi = [];
    let culture = [];

    // 현재 선택된 섹터의 최솟값, 최댓값 array를 저장하는 array
    let category = [[], []];

    if (thisResponse[0][0].hasOwnProperty("Currency")) {
      currency[0] = thisResponse[0]
        .map((v) => v.Currency)
        .reduce((min, cur) =>
          Number(min) > Number(cur) ? Number(cur) : Number(min)
        );
      currency[1] = thisResponse[0]
        .map((v) => v.Currency)
        .reduce((max, cur) =>
          Number(max) < Number(cur) ? Number(cur) : Number(max)
        );
      category[0].push(currency[0]);
      category[1].push(currency[1]);
    }
    if (thisResponse[0][0].hasOwnProperty("Smart Contract Platform")) {
      smart[0] = thisResponse[0]
        .map((v) => v["Smart Contract Platform"])
        .reduce((min, cur) =>
          Number(min) > Number(cur) ? Number(cur) : Number(min)
        );
      smart[1] = thisResponse[0]
        .map((v) => v["Smart Contract Platform"])
        .reduce((max, cur) =>
          Number(max) < Number(cur) ? Number(cur) : Number(max)
        );
      category[0].push(smart[0]);
      category[1].push(smart[1]);
    }
    if (thisResponse[0][0].hasOwnProperty("Computing")) {
      computing[0] = thisResponse[0]
        .map((v) => v.Computing)
        .reduce((min, cur) =>
          Number(min) > Number(cur) ? Number(cur) : Number(min)
        );
      computing[1] = thisResponse[0]
        .map((v) => v.Computing)
        .reduce((max, cur) =>
          Number(max) < Number(cur) ? Number(cur) : Number(max)
        );
      category[0].push(computing[0]);
      category[1].push(computing[1]);
    }
    if (thisResponse[0][0].hasOwnProperty("DeFi")) {
      defi[0] = thisResponse[0]
        .map((v) => v.DeFi)
        .reduce((min, cur) =>
          Number(min) > Number(cur) ? Number(cur) : Number(min)
        );
      defi[1] = thisResponse[0]
        .map((v) => v.DeFi)
        .reduce((max, cur) =>
          Number(max) < Number(cur) ? Number(cur) : Number(max)
        );
      category[0].push(defi[0]);
      category[1].push(defi[1]);
    }
    if (thisResponse[0][0].hasOwnProperty("Culture & Entertainment")) {
      culture[0] = thisResponse[0]
        .map((v) => v["Culture & Entertainment"])
        .reduce((min, cur) =>
          Number(min) > Number(cur) ? Number(cur) : Number(min)
        );
      culture[1] = thisResponse[0]
        .map((v) => v["Culture & Entertainment"])
        .reduce((max, cur) =>
          Number(max) < Number(cur) ? Number(cur) : Number(max)
        );
      category[0].push(culture[0]);
      category[1].push(culture[1]);
    }
    setDatesAndPrices(thisResponse[0]);
    setMinMax([Math.min(...category[0]) - 1, Math.max(...category[1]) + 1]);
  };

  return (
    <>
    <Pc>
    <div style={{ width: "300px;", height: "200px;" }}>
      {datesAndPrices && (
        <div>
          <LineChart
            width={1000}
            height={300}
            data={datesAndPrices}
            margin={{ top: 25, left: 20, right: 40 }}
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
              type="number"
              domain={minMax}
              tickSize={5}
              tickMargin={5}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="Currency"
              stroke="#FFB404"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="Smart Contract Platform"
              stroke="#BCCF5F"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="Computing"
              stroke="#01EDA5"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="DeFi"
              stroke="#24C6FE"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="Culture & Entertainment"
              stroke="#5D5CB0"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </div>
      )}
    </div>
    </Pc>
    <Mobile>
    <div >
      {datesAndPrices && (
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
          <LineChart
            data={datesAndPrices}
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
              type="number"
              domain={minMax}
              tickSize={5}
              tickMargin={5}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="Currency"
              stroke="#FFB404"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="Smart Contract Platform"
              stroke="#BCCF5F"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="Computing"
              stroke="#01EDA5"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="DeFi"
              stroke="#24C6FE"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="Culture & Entertainment"
              stroke="#5D5CB0"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
    </Mobile>
    </>
  );
}

export default CategoryLineGraph_1y;
