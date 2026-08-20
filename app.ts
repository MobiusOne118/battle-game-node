import express, { type Express, type NextFunction, type Request, type Response } from 'express'
import unitsRoute from './src/units.ts'

const PORT = 8080
const app: Express = express()

const myLogger = function (req: Request, res: Response, next: NextFunction) {
  console.log('LOGGED')
  next()
}

const requestTime = function (req: Request, res: Response, next: NextFunction) {
  req.requestTime = Date.now()
  next()
}

app.use('/static', express.static('public'))
app.use('/units', unitsRoute)
app.use(requestTime)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message)
  res.status(500).json({ error: 'Something went wrong' })
})

app.get('/', (req: Request, res: Response) => {
  let responseText = 'Hello from Express<br>'
  const timeAsString = new Date(req.requestTime || 0)
  responseText += `<small>Requested at: ${timeAsString}</small>`
  res.send(responseText)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
