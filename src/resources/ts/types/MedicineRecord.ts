import { Unit } from "./Unit"

export type Medicine = {
  id?: number
  unit_id: number
  unit?: Unit
  name: string
  start_date: string
  dose_amount: number | string
  stock_amount: number| string
  day_of_weeks: []
  times: []
  created_at?: Date
  updated_at?: Date
}