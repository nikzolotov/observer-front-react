import { Link } from "react-router-dom";
import "./observations.css";

export const ObservationList = ({ data }) => {
  return (
    <ul
      className={
        "observations" + (data.length > 5 ? " observations-tiles" : "")
      }
    >
      {data.map((node) => (
        <ObservationListItem data={node} key={node.id} />
      ))}
      <li key="last-child-to-fix-flexboxes" className="observations__item"></li>
    </ul>
  );
};

const ObservationListItem = ({ data }) => {
  const year = new Date(data.createdAt).getFullYear();

  return (
    <li className="observations__item">
      <Link to={"/observation/" + data.id} className="observations__link">
        <img
          className="observations__image"
          src={
            "http://localhost:1337/uploads/" +
            data.media[0].hash +
            data.media[0].ext
          }
          alt={data.name}
        />
        {data.media.length > 1 && (
          <span className="observations__badge">{data.media.length}</span>
        )}
      </Link>
      <p className="observations__year">{year}</p>
    </li>
  );
};
