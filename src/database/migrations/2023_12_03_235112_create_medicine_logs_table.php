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
            // TODO cascadeにするか検討
            $table->foreignId('medicine_id')->constrained()->onDelete('cascade');
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