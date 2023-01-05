import { useState } from "react";

import { DEFAULT_BACKGROUND_COLOR, COLORS, PointData } from "utils";

export const useChartState = () => {
  const [chartState, setChartState] = useState<{
    firstMarkedPoint?: PointData;
    secondMarkedPoint?: PointData;
    backgroundColor: string;
  }>({ backgroundColor: DEFAULT_BACKGROUND_COLOR });

  const handleDeletePoint = ({ point }: { point: PointData }) => {
    const remainingPoint =
      point.id === chartState.firstMarkedPoint?.id
        ? { secondMarkedPoint: chartState.secondMarkedPoint }
        : { firstMarkedPoint: chartState.firstMarkedPoint };
    setChartState({
      backgroundColor: chartState.backgroundColor,
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
        backgroundColor: chartState.backgroundColor,
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

  const handleColorChange = () =>
    setChartState({
      ...chartState,
      backgroundColor:
        COLORS[COLORS.indexOf(chartState.backgroundColor) + 1] ??
        DEFAULT_BACKGROUND_COLOR,
    });

  return { chartState, handleDeletePoint, handlePointClick, handleColorChange };
};
