<?php

namespace App\Http\Requests;

use App\Rules\MedicineAmountDecimalRule;
use App\Rules\MedicineAmountRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreMedicineRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'unit_id' => 'required|integer|exists:units,id',
            'name' => 'required|string|max:255',
            'start_date' => 'required|date_format:Y-m-d',
            'dose_amount' => ['required', 'numeric', new MedicineAmountRule()],
            'stock_amount' => ['required', 'numeric', new MedicineAmountRule()],
            'day_of_weeks' => 'required|array|min:1',
            'day_of_weeks.*' => 'required|integer|exists:days_of_week,id',
            'times' => 'required|array|min:1',
            'times.*' => 'required|integer|between:0,23',
        ];
    }
}