import express, { type Request, type Response, type NextFunction } from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router({ mergeParams: true })
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataPath = path.join(__dirname, '../data/mech-data.json')

// Unit Middleware
const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

router.get('/', async (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  res.json(data)
  // next(e) if we want an error handler
})

router.get('/about', (req: Request, res: Response) => {
  res.send('About units')
})

export default router