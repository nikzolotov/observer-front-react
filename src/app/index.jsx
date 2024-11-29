import { AppRouter } from "./router";

export const App = () => {
  return <AppRouter />;
};

// import { useEffect, useState } from "react";

// function App() {
//   const [observations, setObservations] = useState([]);

//   useEffect(() => {
//     fetch(
//       `${
//         import.meta.env.VITE_STRAPI_API_URL
//       }observations?sort=createdAt:desc&pagination[pageSize]=20`
//     )
//       .then((response) => response.json())
//       .then((data) => setObservations(data.data));
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Observations</h1>
//       </header>
//       <ObservationList data={observations} />
//     </div>
//   );
// }

// function ObservationList({ data }) {
//   return (
//     <ul className="observations">
//       {data.map((node) => (
//         <ObservationListItem data={node} key={node.id} />
//       ))}
//     </ul>
//   );
// }

// function ObservationListItem({ data }) {
//   return <li className="observations__item">{data.name}</li>;
// }

// export default App;
