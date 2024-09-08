<?php

namespace App\Http\Controllers\Division\Admin;


use App\Models\ProductCategories;
use App\Models\Products;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends BaseController
{
    public function index(Request $request): Response
    {   
        $products = Products::all();
        $categories = ProductCategories::all();
        return Inertia::render('Division/Admin/Product/Index',[
            'products' => $products,
            'categories' => $categories
        ]);
    }
    public function create(Request $request): Response
    {
        return Inertia::render('Product/Create');
    }

    public function store(Request $request)
    {

        $request->validate([
            'product_name' => 'required|string|max:255',
            'product_description' => 'nullable|string',
            'product_price' => 'required|numeric|min:0',
            'category_id' => 'required|numeric|min:0',
            'product_image' => 'image|mimes:jpeg,png,jpg,gif',
        ]);

        $nama_file = '';

        if ($request->hasFile('product_image')) {
            $text = $request->file('product_image')->getClientOriginalName();
            $nama_file = "/storage/images/product/foto-". time() . "-" . $text;
            $request->product_image->move(public_path('storage/images/product'), $nama_file);
        }


        $product = new Products();
        $product->product_name = $request->input('product_name');
        $product->product_description = $request->input('product_description');
        $product->product_price = $request->input('product_price');
        $product->product_image = $nama_file;
        $product->category_id = $request->input('category_id');
        $product->save();


        return redirect()->back()->with('success', 'Product created successfully.');
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('Product/Edit');
    }
}
