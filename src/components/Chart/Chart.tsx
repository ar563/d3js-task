import { useState, useEffect } from "react";
import * as d3 from "d3";

import {
  ChartContent,
  LoadingAnimation,
  AxisLeft,
  AxisBottom,
} from "components";
import {
  MARGIN,
  ChartBasicProps,
  PointData,
  DEFAULT_BACKGROUND_COLOR,
} from "utils";
import style from "./style.module.scss";
import dataset from "data.json";

export const Chart = ({ width, height, ...otherProps }: ChartBasicProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;
  const x = dataset.map((data) => data.x);
  const y = dataset.map((data) => data.y);
  const xScale = d3
    .scaleLinear()
    .domain([Math.min(...x), Math.max(...x)])
    .range([0, boundsWidth]);
  const yScale = d3
    .scaleLinear()
    .domain([Math.min(...y), Math.max(...y)])
    .range([boundsHeight, 0]);
  const pointsData: PointData[] = dataset.map((data) => ({
    ...data,
    coordinate: [xScale(data.x), yScale(data.y)],
  }));
  const dataLine = d3.line()(pointsData.map((data) => data.coordinate));

  useEffect(() => {
    d3.select("rect").style("fill", DEFAULT_BACKGROUND_COLOR);
    setTimeout(() => setIsLoading(false), 5000);
  }, []);

  return (
    <div className={style.chartWrapper}>
      {isLoading && <LoadingAnimation />}
      <svg width={width} height={height} className={style.chartBox}>
        <rect
          width={width}
          height={height}
          fill={DEFAULT_BACKGROUND_COLOR}
          opacity="1"
        />
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
          overflow={"visible"}
        >
          <AxisLeft
            yScale={yScale}
            pixelsPerTick={30}
            height={boundsHeight}
            isLoading={isLoading}
          />
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={60}
              width={boundsWidth}
              isLoading={isLoading}
            />
          </g>
          {dataLine && !isLoading && (
            <path fill="none" stroke="#46B5D1" strokeWidth="1.5" d={dataLine} />
          )}
          <ChartContent
            width={boundsWidth}
            height={boundsHeight}
            isLoading={isLoading}
            xScale={xScale}
            yScale={yScale}
            {...otherProps}
          />
        </g>
      </svg>
    </div>
  );
};
