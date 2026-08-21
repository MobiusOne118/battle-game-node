import express, { type Request, type Response } from 'express'
import fs from 'fs'
import { request } from 'http';
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const unitDataPath = path.join(__dirname, '../../data/mech-data.json')

function getUnits(req: Request, res: Response) {
  const data = JSON.parse(fs.readFileSync(unitDataPath, 'utf-8'))
  return data
}

function getSingle(req: Request, res: Response) {
  const data = JSON.parse(fs.readFileSync(unitDataPath, 'utf-8'))
  const unitData = data.find((e: any) => e.name === req.params.unit)
  return (unitData || {})
}

function createUnit(body: { name: string }) {
  const data = JSON.parse(fs.readFileSync(unitDataPath, 'utf-8'))
  const newUnit = { name: body.name, weight: 10, speed: 0 }
  data.push(newUnit)
  fs.writeFileSync(unitDataPath, JSON.stringify(data, null, 2))
  return newUnit
}

export { getUnits, getSingle, createUnit }