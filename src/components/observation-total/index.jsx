import "./observation-total.css";

export const ObservationTotal = ({ total }) => {
  return (
    <p className="observation-total">
      <span className="observation-total__eyes">&#128064;</span>Собрано {total}{" "}
      наблюдений
    </p>
  );
};
