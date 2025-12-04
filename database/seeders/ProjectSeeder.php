<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'E-Commerce Platform',
                'description' => 'A full-featured e-commerce platform built with Laravel and Vue.js. Includes payment integration, inventory management, and a custom admin dashboard.',
                'image_path' => null, // Will use placeholder
                'link' => 'https://github.com/example/ecommerce',
                'technologies' => ['Laravel', 'Vue.js', 'MySQL', 'Stripe'],
            ],
            [
                'title' => '3D Portfolio',
                'description' => 'An interactive 3D portfolio website using Three.js and WebGL. Features immersive scrolling and 3D model interactions.',
                'image_path' => null,
                'link' => 'https://youtube.com/watch?v=dQw4w9WgXcQ', // Example YouTube link
                'technologies' => ['Three.js', 'WebGL', 'GSAP'],
            ],
            [
                'title' => 'Task Management App',
                'description' => 'A productivity application for managing tasks and teams. Real-time updates with WebSockets and a clean UI.',
                'image_path' => null,
                'link' => 'https://example.com/tasks',
                'technologies' => ['React', 'Node.js', 'Socket.io'],
            ],
            [
                'title' => 'AI Image Generator',
                'description' => 'An application that uses Stable Diffusion to generate images from text prompts. Built with Python and React.',
                'image_path' => null,
                'link' => 'https://youtube.com/watch?v=jNQXAC9IVRw', // Another YouTube link
                'technologies' => ['Python', 'React', 'AI', 'Stable Diffusion'],
            ],
            [
                'title' => 'Crypto Dashboard',
                'description' => 'Real-time cryptocurrency tracking dashboard with charts and market analysis tools.',
                'image_path' => null,
                'link' => 'https://example.com/crypto',
                'technologies' => ['Vue.js', 'D3.js', 'CoinGecko API'],
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
