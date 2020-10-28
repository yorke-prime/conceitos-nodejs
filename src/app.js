const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function idVerification(request, response, next) {
  const {id} = request.params;
  
  if(!isUuid(id)) {
    return response.status(400).json({message: 'invalid id'});
  }

  next();
}

app.get("/repositories", (request, response) => {
  // TODO
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs} = request.body;
  const likes = 0;

  const repository = {id: uuid(), title, url, techs, likes};

  repositories.push(repository);

  return response.json(repository);

});



app.put("/repositories/:id", idVerification, (request, response) => {
  // TODO
  const {id} = request.params;
  const { title, url, techs} = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);


  if(repositoryIndex < 0) {
    return response.status(400).json({
      message: 'repository not found'
    });
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", idVerification, (request, response) => {
  // TODO
  const {id} = request.params;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if(repositoryIndex < 0) {
    return response.status(400).json();
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).json();

});

app.post("/repositories/:id/like",  idVerification, (request, response) => {
  // TODO
  const {id} = request.params;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  const repository = repositories.find(repository => repository.id == id);
  
  if(!repository) {
    return response.status(400).send();
  }
  
  repositories[repositoryIndex].likes += 1;

  return response.status(200).json(repository);

});

module.exports = app;
