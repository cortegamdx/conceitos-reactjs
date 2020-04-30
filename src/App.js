import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api"

function App() {
  const [repositories,setRepositories] = useState([]);
  
  
  useEffect(() =>{
    api.get("repositories").then(response =>{
      setRepositories(response.data)
    })
  },[])
  
  
  


  async function handleAddRepository() {
    const user = {
      title: `Desafio Node.js_${Date.now()}`,
      url: "https://github.com/cortegamdx/Conceitos_do_Node.js",
      techs: ["Node.js", "React"]
    }

     const response = await api.post("repositories", user)
    
     setRepositories([...repositories,response.data]);
    
  }

   function handleRemoveRepository(repository) {
    api.delete(`repositories/${repository.id}`)
   
    setRepositories(
      //vai trazer todo mundo que for diferente
      //do id excluido
     repositories.filter(rep => rep.id != repository.id )
    )

  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => (

          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository)}>
              Remover
            </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
  