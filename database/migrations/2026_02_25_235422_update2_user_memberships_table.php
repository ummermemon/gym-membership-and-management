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
            $table->foreignId('membership_plan_id')->nullable()->nullOnDelete()->after('user_id')->change();

            $table->string('plan_name')->after('membership_plan_id')->change();
            $table->decimal('plan_price', 10, 2)->after('plan_name')->change();
            $table->integer('plan_duration')->after('plan_price')->change();

            $table->date('start_date')->after('plan_duration')->change();
            $table->date('end_date')->after('start_date')->change();

            $table->enum('status', ['active', 'expired', 'cancelled'])->default('active')->after('end_date')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
