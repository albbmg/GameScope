<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comparison;

class ComparisonSeeder extends Seeder
{
    public function run()
    {
        Comparison::factory(50)->create();
    }
}
