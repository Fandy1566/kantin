<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

    // protected $fillable = [
    //     'name',
    //     'email',
    //     'password',
    // ];

    function productCategory() {
        return $this->belongsTo(ProductCategories::class, 'category_id');
    }

    function productStock() {
        return $this->hasOne(ProductStocks::class, 'product_id');
    }
}
