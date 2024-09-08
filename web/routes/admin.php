<?php 
use App\Http\Controllers\Division\Admin\DashboardController;
use App\Http\Controllers\Division\Admin\SettingController;
use App\Http\Controllers\Division\Admin\BranchController;
use App\Http\Controllers\Division\Admin\CustomerController;
use App\Http\Controllers\Division\Admin\ProductController;
use App\Http\Controllers\Division\Admin\StockController;
use App\Http\Controllers\Division\Admin\TransferController;
use App\Http\Controllers\Division\Admin\UserController;
use App\Http\Controllers\Division\Admin\TransactionController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('/admin')->name('admin.')->group(function () {

    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/setting', [SettingController::class, 'index'])->name('setting');

    Route::controller(UserController::class)->prefix('/user')->name('user.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/store', 'store')->name('store');
        Route::get('/edit/{id}', 'edit')->name('edit');
        Route::patch('/update', 'update')->name('update');
        Route::delete('/delete', 'destroy')->name('destroy');
    });

    Route::controller(ProductController::class)->prefix('/product')->name('product.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/store', 'store')->name('store');
        Route::get('/edit', 'edit')->name('edit');
        Route::patch('/update', 'update')->name('update');
        Route::delete('/delete', 'destroy')->name('destroy');
    });

    Route::controller(CustomerController::class)->prefix('/customer')->name('customer.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/store', 'store')->name('store');
        Route::get('/edit', 'edit')->name('edit');
        Route::patch('/update', 'update')->name('update');
        Route::delete('/delete', 'destroy')->name('destroy');
    });

    Route::controller(StockController::class)->prefix('/stock')->name('stock.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/store', 'store')->name('store');
        Route::get('/edit', 'edit')->name('edit');
        Route::patch('/update', 'update')->name('update');
        Route::delete('/delete', 'destroy')->name('destroy');
    });

    Route::controller(TransferController::class)->prefix('/stockTransfer')->name('stockTransfer.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/store', 'store')->name('store');
        Route::get('/edit', 'edit')->name('edit');
        Route::patch('/update', 'update')->name('update');
        Route::delete('/delete', 'destroy')->name('destroy');
    });

    Route::controller(BranchController::class)->prefix('/branch')->name('branch.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/store', 'store')->name('store');
        Route::get('/edit', 'edit')->name('edit');
        Route::patch('/update', 'update')->name('update');
        Route::delete('/delete', 'destroy')->name('destroy');
    });

    Route::controller(TransactionController::class)->prefix('/transaction')->name('transaction.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/store', 'store')->name('store');
        Route::get('/edit', 'edit')->name('edit');
        Route::patch('/update', 'update')->name('update');
        Route::delete('/delete', 'destroy')->name('destroy');
    });
});

?>