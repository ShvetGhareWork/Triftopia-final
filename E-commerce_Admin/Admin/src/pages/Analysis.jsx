import React from "react";
import Piechart from "../components/Piechart";
import ScatterGraph from "../components/ScatterGraph";
import PriceChart from "../components/Pricechart";
import Sales from "../components/Sales";

const Analysis = ({ token }) => {
  return (
    <div className="grid grid-rows-3 gap-10">
      <Piechart token={token} />
      <ScatterGraph token={token} />
      <PriceChart token={token} />
      <Sales token={token} />
    </div>
  );
};

export default Analysis;
