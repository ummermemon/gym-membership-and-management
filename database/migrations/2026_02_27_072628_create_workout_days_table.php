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
        Schema::create('workout_days', function (Blueprint $table) {
            $table->id();

            $table->foreignId('workout_plan_id')->constrained()->cascadeOnDelete();

            $table->integer('day_number'); // 1 to 7
            $table->string('title')->nullable(); // Chest Day, Back Day, Rest Day

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workout_days');
    }
};
