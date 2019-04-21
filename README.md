**SWAPI**
===
**O projeto acessa as seguintes dependências, para isso é preciso instala-las:**

1.mongoose `npm install mongoose @types/mongoose`

2.express `npm install express @types/express`

3.sucrase `npm install sucrase`

4.nodemon `npm install nodemon`

5.body-parser `npm install body-parser` 

6.helmet `npm install helmet @types/helmet`

7.request `npm install request`

*Ou simplesmente xD*

`npm install express mongoose sucrase nodemon body-parser helmet request
@types/express @types/mongoose @ types/helmet`

*Para começar o servidor use no seu terminal node: * `npm run dev`

---
**Lista de REST API's**

> GET: Buscar todos os planetas
`http://localhost:3337/?Planeta` 

- 200 -> OK!
---
> GET: Buscar planeta por ID
`/Planeta/?ObjectID`

A resposta da api deve ser o seguinte objeto: 

`
{
    "_id": "5cbb8033a37c701e2c23f26e",
    "nome": "Tatooine",
    "clima": "quente",
    "terreno": "deserto",
    "aparicoes": 5,
    "createdAt": "2019-04-20T20:25:23.470Z",
    "updatedAt": "2019-04-20T20:25:23.470Z",
    "__v": 0
}
`

- 200 -> OK!
- 404 -> ID não é do tipo ObjectID

---
> GET: Buscar planeta por nome
`http://localhost:3337/Planeta/Nome/?nome`

A resposta da api deve ser o seguinte objeto: 

`
{
    "_id": "5cbb8033a37c701e2c23f26e",
    "nome": "Tatooine",
    "clima": "quente",
    "terreno": "deserto",
    "aparicoes": 5,
    "createdAt": "2019-04-20T20:25:23.470Z",
    "updatedAt": "2019-04-20T20:25:23.470Z",
    "__v": 0
}
`
---
> POST: Criar planeta(s)
`http://localhost:3337/Planeta`

Exemplo de json enviado para API: 

`
[
	{
		"nome": "xxxx",
		"clima": "xxxx",
		"terreno": "xxxx"
	},
	{
		"nome": "Tatooine",
		"clima": "Arid",
		"terreno": "Dessert"
	}
]
`
- 200 -> OK!
`
{
    "message": "Planeta(s) criados com sucesso.",
    "obj": [
        {
            "_id": "5cbce73fed3a4c27c0147bf0",
            "nome": "Tatooine",
            "clima": "Arid",
            "terreno": "Dessert",
            "aparicoes": 5,
            "createdAt": "2019-04-21T21:57:19.740Z",
            "updatedAt": "2019-04-21T21:57:19.740Z",
            "__v": 0
        },
        {
            "_id": "5cbce73fed3a4c27c0147bf1",
            "nome": "aa",
            "clima": "Aasd",
            "terreno": "asdfa",
            "aparicoes": 2,
            "createdAt": "2019-04-21T21:57:19.740Z",
            "updatedAt": "2019-04-21T21:57:19.740Z",
            "__v": 0
        }
    ]
}
`
- 404 -> Campos *nome, clima, terreno* são obrigatórios.
`
{
    "message": {
        "errors": {
            "nome": {
                "message": "Nome não pode ser vázio.",
                "name": "ValidatorError",
                "properties": {
                    "message": "Nome não pode ser vázio.",
                    "type": "required",
                    "path": "nome",
                    "value": ""
                },
                "kind": "required",
                "path": "nome",
                "value": ""
            }
        },
        "_message": "Planeta validation failed",
        "message": "Planeta validation failed: nome: Nome não pode ser vázio.",
        "name": "ValidationError"
    }
}
`
---
> PUT: Alterar planeta por ID
`http://localhost:3337/Planeta/ObjectID`

- 200 -> OK!
- 404 -> ID não é do tipo ObjectID
- 500 -> Erro ao atualizar registro.
---
> DELETE: Deletar planeta por ID
`http://localhost:3337/Planeta/ObjectID`

- 200 -> OK!
- 404 -> ID não é do tipo ObjectID
- 500 -> Erro ao deletar registro.
