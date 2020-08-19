import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get(`/repositories`).then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post(`/repositories`, {
      title: "Challenge ReactJS",
      url: "https://github.com/deusimardamiao",
      techs: ["Node", "ReactJS", "React Native"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const noDeleted = repositories.filter((repository) => repository.id !== id);

    setRepositories(noDeleted);
  }

  function renderRepositories(repository) {
    return (
      <li key={repository.id}>
        {repository.title}

        <button onClick={() => handleRemoveRepository(repository.id)}>
          Remover
        </button>
      </li>
    );
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(renderRepositories)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
