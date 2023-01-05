import { useState } from "react";
import * as d3 from "d3";

import { AxisBottom, AxisLeft, AuxilliaryLines } from "components";
import {
  COLORS,
  DEFAULT_POINT_COLOR,
  ChartBasicProps,
  Coordinates,
  PointData,
} from "utils";
import dataset from "data.json";
import style from "./style.module.scss";

interface ChartContentProps extends ChartBasicProps {
  isLoading: boolean;
}

export const ChartContent = ({
  height,
  width,
  firstMarkedPoint,
  secondMarkedPoint,
  handleClick,
  isLoading,
  ...otherProps
}: ChartContentProps) => {
  const [hoveredPoint, setHoveredPoint] = useState<Coordinates>();

  const x = dataset.map((data) => data.x);
  const y = dataset.map((data) => data.y);
  const xScale = d3
    .scaleLinear()
    .domain([Math.min(...x), Math.max(...x)])
    .range([0, width]);
  const yScale = d3
    .scaleLinear()
    .domain([Math.min(...y), Math.max(...y)])
    .range([height, 0]);
  const pointsData: PointData[] = dataset.map((data) => ({
    ...data,
    coordinate: [xScale(data.x), yScale(data.y)],
  }));
  const dataLine = d3.line()(pointsData.map((data) => data.coordinate));

  return (
    <>
      <AxisLeft
        yScale={yScale}
        pixelsPerTick={30}
        height={height}
        isLoading={isLoading}
      />
      <g transform={`translate(0, ${height})`}>
        <AxisBottom
          xScale={xScale}
          pixelsPerTick={60}
          width={width}
          isLoading={isLoading}
        />
      </g>
      {!isLoading && (
        <>
          {dataLine && (
            <path fill="none" stroke="#46B5D1" strokeWidth="1.5" d={dataLine} />
          )}
          {pointsData.map((data) => (
            <circle
              className={style.point}
              key={data.id}
              cx={data.coordinate[0]}
              cy={data.coordinate[1]}
              r="4"
              fill={
                data.id === firstMarkedPoint?.id
                  ? COLORS[0]
                  : data.id === secondMarkedPoint?.id
                  ? COLORS[1]
                  : DEFAULT_POINT_COLOR
              }
              onClick={() => handleClick({ point: data })}
              onMouseOver={() => setHoveredPoint(data.coordinate)}
              onMouseOut={() => setHoveredPoint(undefined)}
              {...otherProps}
            />
          ))}
          {hoveredPoint && (
            <AuxilliaryLines hoveredPoint={hoveredPoint} height={height} />
          )}
        </>
      )}
    </>
  );
};
