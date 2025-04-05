<?php

namespace Database\Seeders;

use App\Models\ProblemSet;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProblemSetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        ProblemSet::factory()->count(3)->create();
    }
}
