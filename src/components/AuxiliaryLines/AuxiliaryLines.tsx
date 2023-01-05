import * as d3 from "d3";

export const AuxilliaryLines = ({
  hoveredPoint,
  height,
}: {
  hoveredPoint: [number, number];
  height: number;
}) => {
  const hoverLineY = d3.line()([[0, hoveredPoint[1]], hoveredPoint]);
  const hoverLineX = d3.line()([[hoveredPoint[0], height], hoveredPoint]);

  return (
    <>
      {[hoverLineY, hoverLineX].map(
        (hoverLine) =>
          hoverLine && (
            <path
              stroke="black"
              strokeWidth="2"
              strokeDasharray="5,5"
              d={hoverLine}
              key={hoverLine}
            />
          )
      )}
    </>
  );
};
