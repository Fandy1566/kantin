<?php

namespace App\Http\Controllers\Division\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branches;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BranchController extends Controller
{
    public function index(Request $request): Response
    {   
        $branches = Branches::all();
        return Inertia::render('Division/Admin/Branch/Index',[
            'branches' => $branches,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'branch_name' => 'required|string|max:255',
            'branch_location' => 'string',
        ]);

        Branches::create($request->all());

        return redirect()->back()->with('success', 'Branch created successfully.');
    }

}
