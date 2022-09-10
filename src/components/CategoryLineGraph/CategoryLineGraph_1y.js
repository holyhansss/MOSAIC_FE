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
  ResponsiveContainer,
} from "recharts";
import { type } from "@testing-library/user-event/dist/type";
import { CustomTooltip } from "../LineGraph/LineGraph1d";

function CategoryLineGraph_1y(props) {
  const dateRange = props.dateRange;
  const categoryArray = props.categoryArray;

  console.log("dateRange should not be null", dateRange);
  console.log("categoryArray should not be null", categoryArray);

  const [datesAndPrices, setDatesAndPrices] = useState([]);
  const [minMax, setMinMax] = useState([]);

  useEffect(() => {
    console.log("1yyyyyyy");
    getCategoryData_1yr();
  }, []);

  const getCategoryData_1yr = async () => {
    const response = await axios.get(
      "http://localhost:5000/market/category/1yr",
      { params: { dateRange: dateRange, categoryArray: categoryArray } }
    );
    const thisResponse = response.data;
    console.log(thisResponse);
    setDatesAndPrices(thisResponse[0]);
    console.log("this response 1y min max: ", thisResponse[1]);
    console.log(
      "this response 1y min max in int : ",
      parseInt(thisResponse[1][0]),
      parseInt(thisResponse[1][1])
    );
    setMinMax([
      parseInt(thisResponse[1][0]) - 20,
      parseInt(thisResponse[1][1]) + 20,
    ]);
  };

  return (
    <div style={{ width: "300px;", height: "200px;" }}>
      {datesAndPrices && (
        <div>
          <LineChart
            width={800}
            height={300}
            data={datesAndPrices}
            margin={{ top: 25, left: 20, right: 40 }}
          >
            <CartesianGrid opacity={0.1} />
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
              stroke="#F2789F"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="Smart Contract Platform"
              stroke="#F999B7"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="Computing"
              stroke="#F9C5D5"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="DeFi"
              stroke="#794C74"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="Culture & Entertainment"
              stroke="#867AE9"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </div>
      )}
    </div>
  );
}

export default CategoryLineGraph_1y;
