<?php

namespace Tests\Unit\Rules;

use App\Rules\MedicineAmountRule;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class MedicineAmountRuleTest extends TestCase
{
    /**
     * 薬の量に対するカスタムバリデーションルールのテスト
     * 
     * @param string 値
     * @param boolean true:バリデーション成功、false:バリデーション失敗
     * @dataProvider medicineAmountDataProvider
     */
    public function testMedicineAmountRuleValidate($value, $expected)
    {        
        // 各項目のカスタムバリデーションを実行し、結果を検証
        $validator = Validator::make(['dose_amount' => $value], ['dose_amount' => [new MedicineAmountRule()]]);        
        $this->assertEquals($expected, $validator->passes());

        $validator = Validator::make(['stock_amount' => $value], ['stock_amount' => [new MedicineAmountRule()]]);
        $this->assertEquals($expected, $validator->passes());
    }

    public function medicineAmountDataProvider()
    {
        return [
            '0_正常' => ['0', true],
            '整数6桁_正常' => ['999999', true],
            '整数7桁_エラー' => ['1234567', false],
            'マイナス_エラー' => ['-1', false],
            '小数点2桁_正常' => ['123.45', true],
            '小数点3桁_エラー' => ['123.456', false],
            '整数6桁_小数点2桁_正常' => ['123456.45', true],
        ];
    }
}