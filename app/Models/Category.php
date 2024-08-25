<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Category extends Model
{
    use HasFactory;

    protected $primaryKey = 'categoryID';

    protected $fillable = [
        'categoryID',
        'categoryName',
    ];

    // Define the relationship to the Product model
    public function products()
    {
        return $this->hasMany(Product::class, 'categoryID');
    }
}
