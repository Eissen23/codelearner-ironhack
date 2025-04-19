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
        //
        Schema::table('courses', function (Blueprint $table) {
            $table->decimal('fee', 10, 2)->default(0.00)->after('short_description');
            $table->string('currency', 3)->default('USD')->after('fee');
        });

        Schema::table('user_courses', function (Blueprint $table) {
            $table->unsignedBigInteger('payment_id')->default(null)->after('course_id');
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
