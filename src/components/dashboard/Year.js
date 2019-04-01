import React from "react";
import { Line } from "react-chartjs-2";

export default function Year({ data }) {
  // console.log(data);
  return (
    <div className='chart'>
      <Line data={data} />
    </div>
  );
}
