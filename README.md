# Sistema SEDUC

## Pré-requesitos:

Antes de tudo, verifique se você tem todos os softwares instalados no seu computador:
- [NodeJS](https://nodejs.org/pt-br/download)
- [Docker](https://www.docker.com/](https://www.docker.com/products/docker-desktop/))
- [Docker compose](https://docs.docker.com/compose/install/)

## Passo a passo para a inicilização do projeto:
### Servidor:
1. Entre na pasta do servidor:
```bash
  cd server/
```

2. Renomeie o arquivo ```.env.template``` para ```.env```:
    - Preencha todos os dados com prefixo ```DB``` com host, porta, nome do banco de dados, usuário e senha a sua escolha.
    - Escolha um valor qualquer, mas matenha em um lugar seguro, para o ```AUTH_SECRET```
    - Você pode escolher uma porta do servidor ou deixar a padrão (5275).
    - De resto, você terá que ver esse tutorial: [Tutorial](https://www.youtube.com/watch?v=0bntGJ0bx9M&t)

3. Inicie e instale o banco de dados:
```bash
  docker-compose up -d
```

4. Instale todas as dependências do projeto:
```bash
  npm install
```

5. Rode as migrations:
```bash
  npx prisma migrate dev
```

6. Rode as seeds:
```bash
  npx prisma db seed
```

7. Inicie o servidor:
```bash
  npm run start:dev
```
### Cliente:
1. Crie um novo terminal

2. Entre na pasta do client:
```bash
  cd client/
```

3. Instale todas as dependências do projeto:
```bash
  npm install
```

4. Inicie o client:
```bash
  npm run dev
```
## Funcionalidades:
O sistema possui um dashboard, onde apenas aqueles que criaram ou administradores podem visualizar vendas. Além de que, usuários
normais conseguem criar novas vendas e colocar um id e um preço.

## Rotas
O projeto possui duas rotas: / e /login;

### Rota root:
Nessa rota você consegue visualizar as suas vendas ou, se for um administrador, todas as vendas. Você precisa estar logado para poder acessa-la.

### Login:
A rota de login você irá preencher seus dados para que posso entrar no sistema. ( Essa rota só estará acessivel se você não estiver logado ).

## Usuário criados e suas permissões:
### Usuários:
Há alguns criados previamente para vocês poderem testarem livremente, são eles com seus nomes, cargos e emails:
1. user01 - user - user01@email.com
2. user02 - user - user02@email.com
3. admin01 - admin - admin01@email.com

Todos eles você consegue entrar com email e senha, que é 12345678.

**Obs.: Todas as senhas são criptografadas!**

### Permissões:
#### Usuário:
Os usuários conseguem apenas vizualizar suas vendas e criar novas vendas com seu ID.

#### Administradores:
Os administradores conseguem vizualizar todas as vendas, criar vendas para usuários ou para o próprio administrador, e cadastrar
novos usuários.

**Obs.: Você terá que realizar o login para poder vizualizar as vendas.**
