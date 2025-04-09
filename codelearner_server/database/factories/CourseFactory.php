<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Organization;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            "name" => $this->faker->name(),
            "description" => $this->faker->paragraph(3,true),
            "short_description"=> $this->faker->sentence(7,true),
            "duration" => $this->faker->numberBetween(1000,9000),
            "org_id"=> Organization::inRandomOrder()->first()->id
        ];
    }
}
