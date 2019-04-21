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

**Lista de REST API's**
===
> GET: Buscar todos os planetas
`http://localhost:3337/?Planeta` 

- 200 -> OK!
---
> GET: Buscar planeta por ID
`/Planeta/?ObjectID`

- 200 -> OK!
- 404 -> ID não é do tipo ObjectID
---
> GET: Buscar planeta por nome
`http://localhost:3337/Planeta/Nome/?nome`

- 200 -> OK!
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
- 404 -> Json com o seguinte erro campos *nome, clima, terreno* são obrigatórios.
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
