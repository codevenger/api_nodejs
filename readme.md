# Implementação de estudo de uma RestAPI em Node.JS

Baseado no trabalho do professor Luiz Otávio Miranda, repositório: https://github.com/luizomf/curso-js/blob/master/api_rest/

Para subir o projeto, copie o arquivo `.env_example` para `.env`, e excute os seguintes comandos:

```
npm install
npx sequelize db:migrate
npx sequelize db:seed:all
npm run dev
```

Alguns comandos úteis:
- Para adicionar uma nova tabela no banco de dados:
```
npx sequelize migration:create --name=<descrição>
npx sequelize db:migrate
```

- Para adicionar novos dados em uma tabela:
```
npx sequelize db:seed
npx sequelize db:seed --seed src/database/seeds/<arquivo>
```
