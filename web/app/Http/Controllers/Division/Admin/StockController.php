<?php

namespace App\Http\Controllers\Division\Admin;


use App\Models\Branches;
use App\Models\BranchStocks;
use App\Models\Products;
use App\Models\ProductStocks;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StockController extends BaseController
{
    public function index(Request $request): Response
    {
        // $stocks = BranchStocks::all();

        $branchId = $request->branch_id ?? Branches::first()->id;
        $branches = Branches::all();
        $products = Products::all();
        $productsWithStock = Products::with([
            'productStock' => function ($query) use ($branchId) {
                $query->where('branch_id', $branchId)->get();
            },
            'productCategory'
        ])->get();
        // $stocks = ProductStocks::with('product', 'branch')->where('branch_id', $branchId)->get();

        return Inertia::render('Division/Admin/Stock/Index', [
            'stocks' => $productsWithStock,
            'products' => $products,
            'branches' => $branches,
            'selectedBranchId' => $branchId,
        ]);

    }
    public function create(Request $request): Response
    {
        return Inertia::render('Stock/Create');
    }

    public function store(Request $request)
    {
        // dd($request->all());

        $validatedData = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|numeric|min:1',
            'branch_id' => 'required|exists:branches,id',
        ]);

        $productStock = ProductStocks::where('product_id', $validatedData['product_id'])
            ->where('branch_id', $validatedData['branch_id'])
            ->first();

        if ($productStock) {
            $productStock->quantity += $validatedData['quantity'];
            $productStock->save();
        } else {
            $productStock = ProductStocks::create([
                'product_id' => $validatedData['product_id'],
                'quantity' => $validatedData['quantity'],
                'branch_id' => $validatedData['branch_id'],
            ]);
        }

        return redirect()->back()->with('success', 'Product stock updated successfully.');
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('Stock/Edit');
    }
}
