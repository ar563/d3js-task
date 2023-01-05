import { useState, useEffect } from "react";

import { ChartContent, LoadingAnimation } from "components";
import { MARGIN, ChartBasicProps } from "utils";
import style from "./style.module.scss";

export const Chart = ({
  width,
  height,
  backgroundColor,
  ...otherProps
}: ChartBasicProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 5000);
  }, []);

  return (
    <div className={style.chartWrapper}>
      {isLoading && <LoadingAnimation />}
      <svg width={width} height={height} className={style.chartBox}>
        <rect
          width={width}
          height={height}
          fill={backgroundColor}
          opacity="1"
        />
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
          overflow={"visible"}
        >
          <ChartContent
            width={boundsWidth}
            height={boundsHeight}
            isLoading={isLoading}
            {...otherProps}
          />
        </g>
      </svg>
    </div>
  );
};
