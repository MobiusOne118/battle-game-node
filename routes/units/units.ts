import express, { type Request, type Response, type NextFunction } from 'express'

import { getUnits, getSingle, createUnit } from './units-controller.ts'

const router = express.Router({ mergeParams: true })

// Unit Middleware
const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

router.get('/', async (req: Request, res: Response) => {
  const data = await getUnits(req, res)
  res.json(data)
})


router.get('/about', (req: Request, res: Response) => {
  res.send('About units')
})

// Must stay below other GET routes, otherwise it swallows their paths (e.g. /about) as :unit
router.get('/:unit', async (req: Request, res: Response) => {
  const unitData = getSingle(req, res)
  res.json(unitData || {})
})

router.post('/:unit', async (req: Request, res: Response) => {
  const newUnit = createUnit(req.body)
  res.status(201).json(newUnit)
})

export default router