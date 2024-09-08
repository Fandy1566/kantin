<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductStocks extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'quantity',
        'branch_id',
    ];

    function product() {
        return $this->belongsTo(Products::class);
    }
}
