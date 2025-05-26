// client/src/components/PnLChart.jsx
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';

/**
 * Example: pass in "data" prop = [{ day: 1, value: 100000 }, ...]
 */
function PnLChart({ data }) {
  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="value" stroke="#82ca9d" />
    </LineChart>
  );
}

export default PnLChart;
