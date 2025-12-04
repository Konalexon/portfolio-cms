<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Project;

$project = Project::latest()->first();
if ($project) {
    echo "ID: " . $project->id . "\n";
    echo "Title: " . $project->title . "\n";
    echo "Link: " . $project->link . "\n";
    echo "Image Path: " . $project->image_path . "\n";
} else {
    echo "No projects found.\n";
}
