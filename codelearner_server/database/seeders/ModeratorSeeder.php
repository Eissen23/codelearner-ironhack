<?php

namespace Database\Seeders;

use App\Models\Moderator;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ModeratorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Moderator::factory()->count(3)->create();
    }
}
