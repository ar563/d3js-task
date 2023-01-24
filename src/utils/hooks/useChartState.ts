import { useState } from "react";
import * as d3 from "d3";

import { PointData, COLORS, DEFAULT_BACKGROUND_COLOR } from "utils";

export const useChartState = () => {
  const [chartState, setChartState] = useState<{
    firstMarkedPoint?: PointData;
    secondMarkedPoint?: PointData;
  }>({});

  const handleDeletePoint = ({ point }: { point: PointData }) => {
    const remainingPoint =
      point.id === chartState.firstMarkedPoint?.id
        ? { secondMarkedPoint: chartState.secondMarkedPoint }
        : { firstMarkedPoint: chartState.firstMarkedPoint };
    setChartState({
      ...remainingPoint,
    });
  };

  const handlePointClick = ({ point }: { point: PointData }) => {
    const isSelectedPoint =
      point.id === chartState.firstMarkedPoint?.id ||
      point.id === chartState.secondMarkedPoint?.id;
    const isAnyPointSelected =
      chartState.firstMarkedPoint || chartState.secondMarkedPoint;
    const isThirdUncheckedPoint =
      chartState.firstMarkedPoint &&
      chartState.secondMarkedPoint &&
      !isSelectedPoint;
    if (!isAnyPointSelected || isThirdUncheckedPoint) {
      setChartState({
        firstMarkedPoint: point,
      });
      return;
    }
    if (isSelectedPoint) {
      handleDeletePoint({ point });
      return;
    }
    setChartState(
      chartState.firstMarkedPoint
        ? { ...chartState, secondMarkedPoint: point }
        : { ...chartState, firstMarkedPoint: point }
    );
  };

  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const rgbToHex = (rgb: number[]) =>
    "#" +
    componentToHex(rgb[0]) +
    componentToHex(rgb[1]) +
    componentToHex(rgb[2]);

  const handleColorChange = () => {
    const previousBackground = d3
      .select("rect")
      .attr("style")
      .match(/\d+/g)
      ?.map((color) => parseInt(color));
    if (!previousBackground) return;
    d3.select("rect").style(
      "fill",
      COLORS[COLORS.indexOf(rgbToHex(previousBackground)) + 1] ??
        DEFAULT_BACKGROUND_COLOR
    );
  };

  return { chartState, handleDeletePoint, handlePointClick, handleColorChange };
};
