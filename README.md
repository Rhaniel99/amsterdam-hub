
# Amsterdam Hub

Amsterdam Hub é um sistema desenvolvido para armazenar os comandos de ferramentas em estudo. Utiliza uma API REST em Node.js e o banco de dados SQLite. O backend integra-se à API do Discord (Discord.js) para enviar imagens para um canal específico e, posteriormente, armazena as URLs dessas imagens no banco de dados. Essas imagens são utilizadas como ícones ilustrativos. Além disso, o sistema emprega a API do Discord para exibir todos os comandos salvos, organizados de acordo com as respectivas ferramentas. Atualmente, estou dedicando esforços ao estudo do ReactJS para desenvolver o frontend responsável pelo cadastro de comandos.



## Funcionalidades

- Armazenamento de comandos de ferramentas em estudo.
- Integração com a API do Discord para envio e armazenamento de imagens.
- Utilização de imagens como ícones ilustrativos.
- Exibição de comandos salvos organizados por ferramenta.
- Desenvolvimento do frontend em ReactJS.
- Utilização de Docker para montar o ambiente de desenvolvimento e integração do banco de dados com a ORM Sequelize utilizando o banco de dados SQLite.
## Instalação

Clone o repositório:

```bash
  https://github.com/Rhaniel99/amsterdam-hub.git
  cd amsterdam-hub
```

Na raiz do repositório, inicie os contêineres e as imagens:

```bash
  docker compose up -d
```
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env, todos são keys e tokens gerados atraves do discordJS.

`TOKEN`

`CLIENT_ID`

`GUILD_ID`

`CHANNEL_ID`



## Ferramentas
- Node.js
- Express.js
- SQLite
- Discord.js
- ReactJS (em desenvolvimento)
- Docker & Docker Compose
## Documentação da API

#### Retorna todos as ferramentas

```http
  GET /api/app/get-tools
```

#### Retorna uma lista comando/atalho de uma ferramenta

```http
  GET /api/app/get-shorts/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `int` | **Obrigatório**.  O ID da ferramenta desejada. |

#### Cadastrar uma ferramenta

```http
  POST /api/app/reg-tools
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string unique` | **Obrigatório**.  O nome da ferramenta. |
| `desc`      | `string` | A descrição da ferramenta. |
| `iconUrl`      | `file` | Imagem ilustrativa da ferramenta. |
| `color`      | `string` | Em formato hexadecimal de cor, irá aparecer na barra lateral. |

Certifique-se de enviar os dados no formato de form-data no corpo da solicitação. Isso garantirá que as informações sejam enviadas corretamente para o servidor.

#### Cadastrar um comando

```http
  POST /api/app/reg-tools
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string unique` | **Obrigatório**.  Descrição do comando. |
| `command`      | `string` |  **Obrigatório**. O comando propriamente dito da ferramenta.|
| `toolId`      | `id`  | ID da ferramenta. |

Certifique-se de enviar os dados no corpo da solicitação. Isso garantirá que as informações sejam enviadas corretamente para o servidor.
## Screenshots

![App Screenshot](https://cdn.discordapp.com/attachments/1115111545526030336/1239697734156681226/image.png?ex=6643ddfc&is=66428c7c&hm=2805848fb91afe565daf8a07636d9492fb0dc0f5fcd4cedea46a8314c37f4284&)

![App Screenshot](https://cdn.discordapp.com/attachments/1115111545526030336/1239698183072780308/image.png?ex=6643de67&is=66428ce7&hm=cc62b3e8123f12fbd296cc7c5ec32ad647583e149024a806a4a94cff439b5423&)


![App Screenshot](https://cdn.discordapp.com/attachments/1115111545526030336/1239697906378997821/image.png?ex=6643de25&is=66428ca5&hm=36da307114cb7c21fa3f1666e9ef05e46189110b47f2ae4b6dad83f00e5030ef&)



## Melhorias

As models sincronizam assim que a conexão com banco de dados SQLITE é conectada.

## Futuras Melhorias

- Integrar os endpoits ao front-end react, para o cadastro dos comandos.
- Integrar a possibilidade de cadastrar links ou artigos de tutorias.
- Integrar paginação nos cards do discordJS.
- Integrar uma busca por comando de acordo com o nome do comando ao invés da ferramenta.

