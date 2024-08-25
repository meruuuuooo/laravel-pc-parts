<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Manufacturer extends Model
{
    use HasFactory;

    protected $primaryKey = 'manufacturerID';

    protected $fillable = [
        'manufacturerID',
        'manufacturerName',
    ];

    // Define the relationship to the Product model
    public function products()
    {
        return $this->hasMany(Product::class, 'manufacturerID');
    }
}
