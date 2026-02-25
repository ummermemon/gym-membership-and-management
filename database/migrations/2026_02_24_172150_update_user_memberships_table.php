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
        Schema::table('user_memberships', function (Blueprint $table) {

            $table->foreignId('user_id')
                ->after('id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('membership_plan_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->string('plan_name');
            $table->decimal('plan_price', 10, 2);
            $table->integer('plan_duration');

            $table->date('start_date');
            $table->date('end_date');

            $table->enum('status', ['active', 'expired', 'cancelled'])
                ->default('active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['user_id', 'membership_plan_id', 'plan_name', 'plan_price', 'plan_duration', 'start_date', 'end_date', 'status']);
        });
    }
};
