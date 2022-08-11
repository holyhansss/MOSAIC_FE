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

function CategoryLineGraph_1d(props) {
  const dateRange = props.dateRange;
  const categoryArray = props.categoryArray;

  console.log("dateRange should not be null", dateRange);
  console.log("categoryArray should not be null", categoryArray);

  let dates = [];

  const [datesAndPrices, setDatesAndPrices] = useState([]);

  useEffect(() => {
    console.log("1ddddddat");
    getCategoryData_1d();
  }, []);

  const getCategoryData_1d = async () => {
    const response = await axios.get(
      "http://localhost:5000/market/category/1d",
      { params: { dateRange: dateRange, categoryArray: categoryArray } }
    );
    console.log(response.data);
    setDatesAndPrices(response.data);
  };

  return (
    <div>
      <div>
        <h>Category data {dateRange} ver </h>
      </div>

      {datesAndPrices && (
        <div>
          <LineChart
            width={900}
            height={300}
            data={datesAndPrices}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="time" />
            <YAxis type="number" domain={[0, 400]} />
            <Tooltip />
            {/* <Legend /> */}
            <Line
              type="monotone"
              dataKey="Currency"
              stroke="green"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Smart Contract Platform"
              stroke="grey"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Computing"
              stroke="skyblue"
              dot={false}
            />
            <Line type="monotone" dataKey="DeFi" stroke="pink" dot={false} />
            <Line
              type="monotone"
              dataKey="Culture & Entertainment"
              stroke="orange"
              dot={false}
            />
            {/* <Line type="monotone" dataKey="Digitization" stroke="gray" dot={false}/>  */}
          </LineChart>
        </div>
      )}
    </div>
  );
}

export default CategoryLineGraph_1d;
