import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Sector
} from "recharts";
import axios from "axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent
  } = props;
  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        className="chart-label"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};
const formatBalance = (balance) => {
  return (balance / 1e9).toFixed(9) + " ETH";
};

const HaverimMashkiim = () => {
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://beaconcha.in/api/v1/validator/ae162b3df59651d42e62e049e0e586ed7272a31a66302eef7f8cfb59eff9d5db9809dcde058cc12fb0334b1cd8a926c2"
      );

      const validatorBalance = data.data.balance;

      setBalance(formatBalance(validatorBalance));

      setData([
        { name: "Aviad", value: validatorBalance * 0.5 },
        { name: "Adir", value: validatorBalance * 0.25 },
        { name: "Niv", value: validatorBalance * 0.25 }
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Total Holdings:</h1>
      <h1>{balance}</h1>
      <ul>
        {data.map((member, index) => (
          <li
            key={member.name}
            style={{ color: COLORS[index % COLORS.length] }}
          >
            {member.name}: {(member.value / 1e9).toFixed(4)} ETH
          </li>
        ))}
      </ul>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            dataKey="value"
            activeShape={renderActiveShape}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HaverimMashkiim;
