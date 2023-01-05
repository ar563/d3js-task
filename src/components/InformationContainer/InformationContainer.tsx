import { PointData } from "utils";
import { Button } from "components";
import style from "./style.module.scss";

export const InformationContainer = ({
  point,
  handleDeletePoint,
}: {
  point: PointData;
  handleDeletePoint: ({ point }: { point: PointData }) => void;
}) => {
  const { coordinate, ...informations } = point;

  return (
    <div className={style.informationCard}>
      <Button variant="icon" onClick={() => handleDeletePoint({ point })}>
        X
      </Button>
      <div>
        {Object.entries(informations).map(([key, value]) => (
          <div className={style.information} key={key}>
            <p>{key}:</p>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
