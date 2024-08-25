<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $categoryName = [
            'cpu',
            'gpu',
            'ram',
            'motherboard',
            'psu',
            'case',
            'storage',
            'cooling',
            'monitor',
            'software',
            'keyboards',
            'mice',
            'headsets',
            'mousepads',
            'chairs',
            'desks',
            'cables',
            'adapters',
            'webcams',
            'microphones',
            'speakers'
        ];

        return [
            'categoryName' => $this->faker->unique()->randomElement($categoryName),
        ];
    }
}
