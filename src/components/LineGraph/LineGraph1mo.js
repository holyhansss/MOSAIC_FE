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
  const [res, setRes] = useState([]);

    const getSNPCMC_1mo = async () => {
        const response = await axios.get('http://localhost:5000/market/snpcmc/1mo'
        )
        console.log(response.data);
        setRes(response.data)
      }

    useEffect(() => {
        getSNPCMC_1mo();
      }, []);
  return (
    <div>
      {res && (
        <div>
          <LineChart
            width={900}
            height={300}
            data={res}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="Time" />
            <YAxis domain={[80, 120]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="SNP" stroke="#8884d8" dot={false} />
            <Line type="monotone" dataKey="CMC" stroke="#82ca9d" dot={false} />
          </LineChart>
        </div>
      )}
    </div>
  );
}
export default Index1mo;
