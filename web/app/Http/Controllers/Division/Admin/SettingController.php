<?php

namespace App\Http\Controllers\Division\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function index(): Response {
        return Inertia::render('Division/Admin/Setting/Index');
    }
}
