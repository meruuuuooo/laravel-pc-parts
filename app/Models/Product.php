<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Manufacturer;

class Product extends Model
{
    use HasFactory;

    protected $primaryKey = 'productID';

    protected $fillable = [
        'name',
        'model',
        'description',
        'price',
        'imageURL',
        'isFeatured',
        'isDeleted',
        'categoryID',
        'manufacturerID',
    ];



    // Define the relationships to other models
    public function category()
    {
        return $this->belongsTo(Category::class, 'categoryID');
    }

    public function manufacturer()
    {
        return $this->belongsTo(Manufacturer::class, 'manufacturerID');
    }
}
