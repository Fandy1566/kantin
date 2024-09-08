<?php

namespace App\Http\Controllers\Division\Cashier;

use App\Http\Controllers\Controller;
use App\Models\ProductCategories;
use App\Models\Products;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    public function create(Request $request): Response
    {   
        $products = Products::all();
        $categories = ProductCategories::all();
        return Inertia::render('Division/Cashier/Transaction/Create',[
            'products' => $products,
            'categories' => $categories,
        ]);
    }
}
