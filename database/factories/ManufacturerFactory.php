<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Manufacturer>
 */
class ManufacturerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $manufacturerName = [
            'Apple',
            'Samsung',
            'Dell',
            'HP',
            'Lenovo',
            'Asus',
            'Acer',
            'MSI',
            'Razer',
            'Alienware',
            'Microsoft',
            'Sony',
            'LG',
            'Google',
            'Nvidia',
            'AMD',
            'Intel',
            'Corsair',
            'Logitech',
            'SteelSeries',
            'HyperX',
            'Kingston',
            'Crucial',
            'G.Skill',
            'Western Digital',
            'Seagate',
        ];

        return [
            'manufacturerName' => $this->faker->unique()->randomElement($manufacturerName),
        ];
    }
}
