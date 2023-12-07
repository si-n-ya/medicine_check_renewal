import { Unit } from "./Unit"
import { MedicineTime } from "./MedicineTime"
import { MedicineDay } from "./MedicineDay"

export type MedicineRecord = {
  id?: number
  unit_id: number
  unit: Unit
  name: string
  start_date: string
  dose_amount: number | string
  stock_amount: number| string
  medicine_times: MedicineTime[]; // MedicineTime に関する型定義
  medicine_days: MedicineDay[]; // MedicineDay に関する型定義
}