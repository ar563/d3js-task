import style from "./style.module.scss";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "icon";
}

export const Button = ({ variant, ...otherProps }: ButtonProps) => {
  return <button className={style[variant ?? "button"]} {...otherProps} />;
};
