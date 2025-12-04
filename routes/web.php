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

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Artisan;

Route::get('/debug-db', function () {
    try {
        // Run migrations
        Artisan::call('migrate', ['--force' => true]);
        $migrationOutput = Artisan::output();

        $pdo = DB::connection()->getPdo();
        $dbName = DB::connection()->getDatabaseName();
        $connectionName = DB::connection()->getName();

        $hasProjects = Schema::hasTable('projects') ? 'YES' : 'NO';

        $tables = [];
        if ($connectionName === 'sqlite') {
            $tables = array_map(function ($row) {
                return $row->name;
            }, DB::select("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;"));
        } else {
            $tables = array_map('reset', DB::select('SHOW TABLES'));
        }

        return response()->json([
            'status' => 'success',
            'migration_output' => $migrationOutput,
            'connection' => $connectionName,
            'database' => $dbName,
            'has_projects_table' => $hasProjects,
            'tables' => $tables,
            'config' => config("database.connections.$connectionName"),
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ], 500);
    }
});

Route::get('/fix-login', function () {
    $user = \App\Models\User::firstOrNew(['email' => 'admin@example.com']);
    $user->name = 'Admin';
    $user->password = \Illuminate\Support\Facades\Hash::make('password');
    $user->save();
    return 'Admin password reset to: password. <a href="/login">Go to Login</a>';
});
