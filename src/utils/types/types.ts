import { ScaleLinear } from "d3";

export type Coordinates = [number, number];

export interface PointData {
  coordinate: Coordinates;
  id: number;
  x: number;
  y: number;
  target: number;
  prediction: number;
  diagnosisGroupId: number;
}

export interface AxisProps {
  pixelsPerTick: number;
  isLoading: boolean;
}

export interface AxisBottomProps extends AxisProps {
  xScale: ScaleLinear<number, number>;
  width: number;
}

export interface AxisLeftProps extends AxisProps {
  yScale: ScaleLinear<number, number>;
  height: number;
}

export interface ChartBasicProps {
  width: number;
  height: number;
  firstMarkedPoint?: PointData;
  secondMarkedPoint?: PointData;
  handleClick: ({ point }: { point: PointData }) => void;
  backgroundColor?: string;
}
