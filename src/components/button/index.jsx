import { Link } from "react-router-dom";
import "./button.css";

export const Button = ({ onClick, to = "", children }) => {
  return (
    <Link className="button" onClick={onClick} to={to}>
      <CloseCircle />
      <span className="button__title">{children}</span>
    </Link>
  );
};
const CloseCircle = (props) => {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={16} cy={16} r={16} fill="#3A434F" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.41 10.41a.833.833 0 011.18 0L16 14.823l4.41-4.411a.833.833 0 111.18 1.178L17.177 16l4.411 4.41a.833.833 0 01-1.178 1.18L16 17.177l-4.41 4.411a.833.833 0 01-1.18-1.178L14.823 16l-4.411-4.41a.833.833 0 010-1.18z"
        fill="#fff"
      />
    </svg>
  );
};
