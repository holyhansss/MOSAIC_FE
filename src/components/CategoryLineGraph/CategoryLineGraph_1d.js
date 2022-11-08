import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

//Responsive Web
import {Pc, Mobile} from "../Responsive/Responsive";

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
        {payload.map((line, index) => (
          <div
            style={{ color: line.stroke }}
          >{`${line.dataKey} : ${line.value}`}</div>
        ))}
      </div>
    );
  }

  return null;
};

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
    setDatesAndPrices(thisResponse[0]);
    console.log(response);
    if (thisResponse == null || thisResponse[1][0] == undefined) {
      setMinMax([85, 105]);
    } else {
      setMinMax([
        parseInt(thisResponse[1][0]) - 3,
        parseInt(thisResponse[1][1]) + 3,
      ]);
    }
  };

  return (
    <div>
      <Pc>
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
              stroke="#DBDFFD"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="Smart Contract Platform"
              stroke="#9BA3EB"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="Computing"
              stroke="#646FD4"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="DeFi"
              stroke="#242F9B"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="Culture & Entertainment"
              stroke="#210B61"
              dot={false}
              isAnimationActive={false}
            />
            {/* <Line type="monotone" dataKey="Digitization" stroke="gray" dot={false}/>  */}
          </LineChart>
        </div>
      )}
      </Pc>
      <Mobile>
      {datesAndPrices && (
        <div>
          <LineChart
            width={250}
            height={150}
            data={datesAndPrices}
            margin={{ top: 5, bottom: 5 }}
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
              stroke="#DBDFFD"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="Smart Contract Platform"
              stroke="#9BA3EB"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="Computing"
              stroke="#646FD4"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="DeFi"
              stroke="#242F9B"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="Culture & Entertainment"
              stroke="#210B61"
              dot={false}
              isAnimationActive={false}
            />
            {/* <Line type="monotone" dataKey="Digitization" stroke="gray" dot={false}/>  */}
          </LineChart>
        </div>
      )}
      </Mobile>
    </div>
  );
}

export default CategoryLineGraph_1d;
