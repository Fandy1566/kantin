<?php
use App\Http\Controllers\Division\Cashier\TransactionController;
use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::prefix('/cashier')->name('cashier.')->group(function () {
        Route::controller(TransactionController::class)->prefix('/transaction')->name('transaction.')->group(function () {
            Route::get('/', 'create')->name('create');
            Route::post('/store', 'store')->name('store');
        });
    });
});
?>