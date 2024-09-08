<?php

namespace App\Http\Controllers\Division\Admin;


use App\Models\Transactions;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends BaseController
{
    public function index(Request $request): Response
    {   
        $transaction = Transactions::all();
        return Inertia::render('Division/Admin/Transaction/Index',[
            'transaction' => $transaction,
        ]);
    }
}
