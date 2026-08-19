import express, { type Express, type Request, type Response } from 'express'

const PORT = 8080
const app: Express = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express in TS')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});