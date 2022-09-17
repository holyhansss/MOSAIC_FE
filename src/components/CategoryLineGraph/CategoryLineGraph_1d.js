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
import { CustomTooltip } from "../LineGraph/LineGraph1d";

function CategoryLineGraph_1d(props) {
  const dateRange = props.dateRange;
  const categoryArray = props.categoryArray;

  const [datesAndPrices, setDatesAndPrices] = useState([]);
  const [minMax, setMinMax] = useState([]);

  useEffect(() => {
    getCategoryData_1d();
  }, []);

  const getCategoryData_1d = async () => {
    const response = await axios.get(
      "http://localhost:5000/market/category/1d",
      { params: { dateRange: dateRange, categoryArray: categoryArray } }
    );
    const thisResponse = response.data;
    setDatesAndPrices(thisResponse[0])
    if (thisResponse==null || thisResponse[1][0]==undefined){
      setMinMax([0, 100])
    } else {
      setMinMax([parseInt(thisResponse[1][0]), parseInt(thisResponse[1][1])])  
    }
  };

  return (
    <div>
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
            {/* <Line type="monotone" dataKey="Digitization" stroke="gray" dot={false}/>  */}
          </LineChart>
        </div>
      )}
    </div>
  );
}

export default CategoryLineGraph_1d;
