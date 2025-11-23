<?php

use App\Http\Controllers\PublicController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SettingController;
use Illuminate\Support\Facades\Route;

Route::get('lang/{locale}', function ($locale) {
    if (in_array($locale, ['en', 'pl'])) {
        session(['locale' => $locale]);
    }
    return redirect()->back();
})->name('lang.switch');

Route::get('/', [PublicController::class, 'index'])->name('home');
Route::get('/projects/{project}', [PublicController::class, 'show'])->name('projects.show');
Route::get('/contact', [PublicController::class, 'contact'])->name('contact');

Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/login', [AuthController::class, 'authenticate'])->name('authenticate');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::resource('projects', ProjectController::class);
    Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('settings', [SettingController::class, 'update'])->name('settings.update');
});
