<?php

namespace App\Http\Controllers\Division\Admin;


use App\Models\Branches;
use App\Models\Products;
use App\Models\ProductStocks;
use App\Models\StockTransfer;
use App\Models\StockTransferDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class TransferController extends BaseController
{
    public function index(Request $request): Response
    {
        $stockTransfer = StockTransfer::all();
        return Inertia::render('Division/Admin/StockTransfer/Index', [
            'stockTransfer' => $stockTransfer,
        ]);
    }

    public function create(Request $request): Response
    {
        $branches = Branches::all();
        $products = Products::all();
        return Inertia::render('Division/Admin/StockTransfer/Create', [
            'branches' => $branches,
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        $stock_transfer = new StockTransfer();
        $stock_transfer->transfer_date = Carbon::now();
        $stock_transfer->branch_id = $request->branch_id;
        $stock_transfer->branch_destination_id = $request->branch_destination_id;
        $stock_transfer->user_id = Auth::user()->id;
        $stock_transfer->save();

        foreach ($request->product_details as $product) {
            $stock_transfer_detail = new StockTransferDetail();
            $stock_transfer_detail->stock_transfer_id = $stock_transfer->id;
            $stock_transfer_detail->quantity = $product['quantity'];
            $stock_transfer_detail->product_id = $product['product_id'];
            $stock_transfer_detail->save();


            $product_stocks = ProductStocks::where([
                ['branch_id', $request->branch_id],
                ['product_id', $product['product_id']]
            ])->first();

            if ($product_stocks->quantity - $product['quantity'] >= 0) {
                $product_stocks->quantity -= $product['quantity'];
                $product_stocks->save();
            } else {
                return redirect()->back()->with('error', 'Stock is less than 0');
            }

            $product_stocks->quantity -= $product['quantity'];
            $product_stocks->save();

            $product_stocks = ProductStocks::where([
                ['branch_id', $request->branch_destination_id],
                ['product_id', $product['product_id']]
            ])->first();

            if ($product_stocks) {
                $product_stocks->quantity += $product['quantity'];
                $product_stocks->save();
            } else {
                $productStock = ProductStocks::create([
                    'product_id' => $product['product_id'],
                    'quantity' => $product['quantity'],
                    'branch_id' => $request->branch_destination_id,
                ]);
            }
        }

        return redirect()->back()->with('success', 'Transfer is success!');
    }
}
