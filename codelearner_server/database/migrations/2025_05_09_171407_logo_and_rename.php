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
        Schema::table('problem_sets', function (Blueprint $table) {
            $table->string('logo')->nullable()->after('description');
        });
        //
        Schema::table('courses', function (Blueprint $table) {
            $table->string('logo')->nullable()->after('description');
        });
        //
        Schema::table('users', function (Blueprint $table) {
            $table->string('image_avatar')->nullable()->after('about');
        });
        //
        Schema::table('organizations', function (Blueprint $table) {
            $table->renameColumn('org_name', 'name');
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
