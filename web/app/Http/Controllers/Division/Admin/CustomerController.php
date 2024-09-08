<?php

namespace App\Http\Controllers\Division\Admin;

use App\Models\Customers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends BaseController
{
    public function index(Request $request): Response
    {   
        $customers = Customers::all();
        return Inertia::render('Division/Admin/Customer/Index',[
            'customers' => $customers,
        ]);
    }
}
