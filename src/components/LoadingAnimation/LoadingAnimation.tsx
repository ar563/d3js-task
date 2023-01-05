import style from "./style.module.scss";

export const LoadingAnimation = () => {
  return (
    <svg className={style.spinner}>
      <circle cx="20" cy="20" r="18"></circle>
    </svg>
  );
};
