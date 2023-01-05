import style from "./style.module.scss";

interface WrapperProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  variant?: "centered" | "unstyled";
}

export const Wrapper = ({ children, variant, ...otherProps }: WrapperProps) => {
  return (
    <div className={style[variant ?? "wrapper"]} {...otherProps}>
      {children}
    </div>
  );
};
