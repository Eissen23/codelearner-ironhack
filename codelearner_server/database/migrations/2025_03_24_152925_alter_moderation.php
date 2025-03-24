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
        //essentially remove the moderator_organization table
        Schema::dropIfExists('mod_organizations');
        //update the moderator table
        Schema::table('moderators', function (Blueprint $table) {
            $table->dropColumn('account_name');
            $table->dropColumn('email');
            $table->dropColumn('password');
            $table->dropColumn('fullname');
            $table->dropColumn('remember_token');
            $table->dropColumn('updated_at');

            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('org_id')->constrained('organization','org_id')->onDelete('no action');
            $table->string('role');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('Moderator', function (Blueprint $table) {
            //
            
        });
    }
};
