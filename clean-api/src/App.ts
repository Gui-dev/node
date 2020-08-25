import { Server } from './main/Server'

const app = new Server().app
const port = process.env.PORT || 3030

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`)
})
