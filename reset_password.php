<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

try {
    $email = 'admin@example.com';
    $password = 'password';

    $user = User::where('email', $email)->first();

    if (!$user) {
        $user = new User();
        $user->name = 'Admin User';
        $user->email = $email;
        echo "Creating new user...\n";
    } else {
        echo "Updating existing user...\n";
    }

    $user->password = Hash::make($password);
    $user->save();

    echo "User [{$email}] password set to [{$password}]\n";
    echo "User ID: " . $user->id . "\n";

} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
