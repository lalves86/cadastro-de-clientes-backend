# Cadastro de Clientes

Esta aplicação executa uma operação de CRUD em um banco de dados para cadastro de clientes.

## Uso

Para testar o código basta clonar o repositório e seguir os passos abaixo:

```
> yarn // Instalar as dependências da aplicação
> yarn dev // Iniciar o servidor local
```

Acessar o endereço http://localhost:3333

## Fazendo uma requisição

Uma requisição é feita através da rota /clientes;

#### Rotas:

* GET http://localhost:3333 - Retorna todos os clientes
* GET http://localhost:3333/id - Retorna um cliente específico
* POST http://localhost:3333 - Cadastra um novo cliente
* PUT http://localhost:3333/id - Altera os dados de um cliente específico 
* DELETE http://localhost:3333/id - Muda o status de um cliente para excluído

* req.body (JSON)

```
{
  "name": "Nome do cliente",
  "address: "Endereço do cliente",
  "phone": "xxxxxxxxx",
  "status": "ativo" | "inativo" | "excluído"
}
```
