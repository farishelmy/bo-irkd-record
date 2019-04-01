import React from "react";
import { HorizontalBar } from "react-chartjs-2";

export default function Total({ data }) {
  return (
    <div className='chart'>
      <HorizontalBar data={data} />
    </div>
  );
}
