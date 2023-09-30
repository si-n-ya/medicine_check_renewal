<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class MedicineAmountRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $integerPart = config('const.MEDICINE_AMOUNT.INTEGER_PART');
        $decimalPart = config('const.MEDICINE_AMOUNT.DECIMAL_PART');

        // 整数と小数に分割
        $parts = explode('.', $value);
        
        // 整数の長さを確認
        if ((strlen($parts[0]) > $integerPart) || ($parts[0] < 0)) {
            $fail(__(':attributeは0から999999.99の間で入力してください。', [
                // 'attribute' => $attribute,
                'max' => $integerPart
            ]));
            return;
        }

        // 小数の長さを確認
        if (isset($parts[1]) && strlen($parts[1]) > $decimalPart) {
            $fail(__(':attributeは小数第:max位以下で入力してください。', [
                // 'attribute' => $attribute,
                'max' => $decimalPart
            ]));
            return;
        }
    }
}