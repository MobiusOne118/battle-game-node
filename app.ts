import express, { type Express, type NextFunction, type Request, type Response } from 'express'
import unitsRoute from './routes/units/units.ts'

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

app.use(requestTime)
app.use('/static', express.static('public'))
app.use('/units', unitsRoute)

app.get('/', (req: Request, res: Response) => {
  let responseText = 'Hello from Express<br>'
  const timeAsString = new Date(req.requestTime || 0)
  responseText += `<small>Requested at: ${timeAsString}</small>`
  res.send(responseText)
})

// Must stay after all routes/middleware above, otherwise it won't catch their errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message)
  res.status(500).json({ error: 'Something went wrong' })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
