<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('medicine_logs', function (Blueprint $table) {
            $table->id();
            // 元のデータが変更または削除された場合にログデータは変更されず、ログの取り消しを行った場合は、元に戻すため、「onDelete('set null');にして、「medicines」レコードが存在しなくても維持できるようにする
            $table->foreignId('medicine_time_id')->nullable()->constrained()->onDelete('set null');
            $table->string('name');
            $table->integer('time');
            $table->date('date_taken');
            $table->decimal('amount_taken', 8, 2); // 少数第二位まで
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicine_logs');
    }
};