import { useState, useMemo } from "react";
import * as d3 from "d3";

import { AxisBottom, AxisLeft, AuxilliaryLines } from "components";
import {
  COLORS,
  DEFAULT_POINT_COLOR,
  ChartBasicProps,
  Coordinates,
  PointData,
  useChartState,
} from "utils";
import dataset from "data.json";
import style from "./style.module.scss";

interface ChartContentProps extends ChartBasicProps {
  isLoading: boolean;
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
}

export const ChartContent = ({
  height,
  width,
  handleClick,
  isLoading,
  xScale,
  yScale,
}: ChartContentProps) => {
  const [hoveredPoint, setHoveredPoint] = useState<Coordinates>();
  const { chartState, handlePointClick } = useChartState();

  const pointsData: PointData[] = dataset.map((data) => ({
    ...data,
    coordinate: [xScale(data.x), yScale(data.y)],
  }));

  return (
    <>
      {!isLoading && (
        <>
          {pointsData.map((data) => (
            <circle
              className={style.point}
              key={data.id}
              cx={data.coordinate[0]}
              cy={data.coordinate[1]}
              r="4"
              fill={
                data.id === chartState.firstMarkedPoint?.id
                  ? COLORS[0]
                  : data.id === chartState.secondMarkedPoint?.id
                  ? COLORS[1]
                  : DEFAULT_POINT_COLOR
              }
              onClick={() => {
                handleClick({ point: data });
                handlePointClick({ point: data });
              }}
              onMouseOver={() => setHoveredPoint(data.coordinate)}
              onMouseOut={() => setHoveredPoint(undefined)}
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
