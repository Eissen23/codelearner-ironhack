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
        Schema::create('mod_organizations', function (Blueprint $table) {
            $table->id('mod_org_id');
            $table->foreignId('mod_id')->constrained('moderators', 'mod_id')->onDelete('cascade');
            $table->foreignId('org_id')->constrained('organizations', 'org_id')->onDelete('cascade');
            $table->boolean('role')->default(0);
            $table->timestamp('created_at')->nullable();
        });

        // Schema::table('moderators', function (Blueprint $table) {
        //     $table->
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mod_organizations');
    }
};
