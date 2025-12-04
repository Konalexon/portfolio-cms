<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Setting;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function index()
    {
        $projects = Project::latest()->get();
        $aboutMe = Setting::where('key', 'about_me')->value('value');
        return view('home', compact('projects', 'aboutMe'));
    }

    public function show(Project $project)
    {
        return view('project.show', compact('project'));
    }

    public function contact()
    {
        return view('contact');
    }
}
