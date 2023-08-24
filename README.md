<p align="center">
  <img alt="Rocketseat Education" src="https://res.cloudinary.com/practicaldev/image/fetch/s--Qhu3PUis--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y63ie8bmktwik5w3mhlg.png" />
</p>

<h1 align="center"> MyContacts Project 💻 </h1>


# 💻 MyContacts

<p> Manage your contact list through the platform, where you can insert, update or remove a contact. You can also search and identify them by categories!</p>

## Learnings

- Create form and validation manually;
- Theme configuration with StyledComponents;
- React Portals;
- Custom hooks for httpclient, errors, others;
- Colors;
- Service layer;
- Optimization of SVG;
- Creation of Listeners events
- Data Mappers
- Implementation of Container/Presentational
- Animations and Keyframes
- Update React 18 and React Router V6
- Instructions SQL in Back-end

## Functionalities

- List contacts
- List details contact
- Create new contact
- Delete contact;

## 👨‍💻 Tecnologias
These were the technologies used in this project!

<br>

Backend:
- [Node.JS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Express Async Errors](https://www.npmjs.com/package/express-async-errors)
- [Docker](https://www.docker.com/)
- [Postgres](https://www.postgresql.org/)

<br>

Frontend:
- [React](https://reactjs.org/)
- [React DOM](https://reactjs.org/docs/react-dom.html)
- [React Router DOM](https://reactrouter.com/en/main)
- [Prop Types](https://www.npmjs.com/package/prop-types)
- [Styled Components](https://styled-components.com/)
- [Vite](https://vitejs.dev/)

<br>


## Instalação

Rode os comandos abaixos para instalar a imagem do Postgres no Docker.
```bash
# Baixar a imagem
$ docker pull postgres

# Criar o container
$ docker run --name pg -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres

# Caso não tenha iniciado automaticamente, rode:
$ docker start pg

# Para verificar se o container está rodando, rode:
$ docker ps
```

<br>

Após colocar o container para rodar, você precisará criar o Banco de Dados e as tabelas manualmente.
```bash
# Acesse o banco de dados
$ docker exec -it pg bash

# Entre no usuário que você criou, no caso, criamos o root
$ psql -U root

# Para criar o banco de dados, cole a instrução abaixo
$ CREATE DATABASE mycontacts;

# Acesse o banco recém criado
$ \c mycontacts

# Dentro do arquivo schema.sql, você encontrará o restante das instruções 
# para criar as tabelas necessárias da nossa aplicação
```

<br>

Install mycontacts with npm or yarn;

```bash
  git clone project;
  yarn or npm to install dependecies;
  cd folder mycontacts;
  yarn start;
```
    
## Screenshots
![Screen Recording 2023-08-24 at 18 00 44](https://github.com/Gabriel-Jesusvix/mycontacts/assets/62946928/7d8e91ec-2b39-4935-aadf-4501f441e6ff)


![Screen Recording 2023-08-24 at 18 00 44](https://github.com/Gabriel-Jesusvix/mycontacts/assets/62946928/ecf85e4e-5981-42b0-ae1e-276885282625)





