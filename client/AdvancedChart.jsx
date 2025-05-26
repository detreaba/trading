import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

function AdvancedChart({ data }) {
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: 600,
      height: 400,
      layout: { backgroundColor: '#ffffff', textColor: '#000' },
      grid: { vertLines: { color: '#eee' }, horzLines: { color: '#eee' } }
    });
    const candleSeries = chart.addCandlestickSeries();
    candleSeries.setData(data);

    return () => {
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} />;
}

export default AdvancedChart;
