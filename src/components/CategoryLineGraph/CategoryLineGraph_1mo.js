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

// import { type } from '@testing-library/user-event/dist/type/index.js';
// import {get_coins_specific_category, return_calculated_prices} from '../../datafetching/queries.js'

function CategoryLineGraph_1mo(props) {
  const dateRange = props.dateRange;
  const categoryArray = props.categoryArray;

  console.log("dateRange should not be null", dateRange);
  console.log("categoryArray should not be null", categoryArray);
  const [datesAndPrices, setDatesAndPrices] = useState([])
  const [minMax, setMinMax] = useState([])

  useEffect(() => {
    console.log("1mmmmmmonth");
    getCategoryData_1mo();
  }, []);

  const getCategoryData_1mo = async () => {
    const response = await axios.get('http://localhost:5000/market/category/1mo',
    {params: {dateRange: dateRange, categoryArray: categoryArray}}
    )
    const thisResponse = response.data;
    console.log(thisResponse);
    setDatesAndPrices(thisResponse[0])
    console.log("this response 1mo min max: ", thisResponse[1]);
    setMinMax([parseInt(thisResponse[1][0])-10, parseInt(thisResponse[1][1])+10])
  }

  return (
    <div>
      {datesAndPrices && (
        <div>
          <LineChart
            width={800}
            height={300}
            data={datesAndPrices}
            margin={{ top: 25, left: 20, right: 40 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3"/>
            <XAxis dataKey="time" />
            <YAxis type="number" domain={minMax} />
            <Tooltip />
            {/* <Legend /> */}
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

export default CategoryLineGraph_1mo;
