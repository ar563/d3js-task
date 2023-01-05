import { useMediaQuery } from "usehooks-ts";

import { Chart, Button, InformationContainer, Wrapper } from "components";
import { useChartState } from "utils";
import "styles.scss";

export const App = () => {
  const { chartState, handleDeletePoint, handlePointClick, handleColorChange } =
    useChartState();
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Wrapper>
      <Wrapper variant="centered">
        <Chart
          width={isMobile ? 350 : 700}
          height={isMobile ? 350 : 700}
          handleClick={handlePointClick}
          {...chartState}
        />
        <Button onClick={handleColorChange}>change color</Button>
      </Wrapper>
      <Wrapper variant={isMobile ? "centered" : "unstyled"}>
        {[chartState.firstMarkedPoint, chartState.secondMarkedPoint].map(
          (point) =>
            point && (
              <InformationContainer
                point={point}
                handleDeletePoint={handleDeletePoint}
                key={point.id}
              />
            )
        )}
      </Wrapper>
    </Wrapper>
  );
};
