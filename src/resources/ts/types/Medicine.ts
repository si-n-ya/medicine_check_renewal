export type Medicine = {
  id?: number
  unit_id: number
  name: string
  start_date: string
  dose_amount: number | string
  stock_amount: number| string
  created_at?: Date
  updated_at?: Date
}