<?php

namespace Database\Factories;

use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProblemSet>
 */
class ProblemSetFactory extends Factory
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
            "name" => $this->faker->sentence(3, true),
            "description" => $this->faker->sentence(10, true),
            "expired_at" => $this->faker->dateTime(),
            "org_id" => Organization::inRandomOrder()->first()->id,
        ];
    }
}
