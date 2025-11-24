@extends('layouts.app')

@section('content')
    <!-- SCENE 1: INTRO (Relative Position) -->
    <div class="scene-intro" id="sceneIntro">
        <div class="glitch-wrapper">
            <h1 class="intro-text glitch" data-text="{{ __('Portfolio / CV') }}">{{ __('Portfolio / CV') }}</h1>
        </div>
    </div>

    <!-- SCENE 2: PROFILE (Relative Position) -->
    <div class="scene-profile" id="sceneProfile">
        <div class="profile-card-3d scroll-reveal" id="profileCard">
            <div class="row align-items-center">
                <!-- Left: Tilted Rectangular Image -->
                <div class="col-md-5">
                    <div class="profile-img-rect">
                        <img src="https://ui-avatars.com/api/?name=Konrad+Lasota&background=0D8ABC&color=fff&size=400"
                            alt="Profile">
                    </div>
                </div>

                <!-- Right: Content -->
                <div class="col-md-7 text-start ps-md-5">
                    <h2 class="display-4 fw-bold text-white mb-3">{{ __('Konrad Lasota') }}</h2>
                    <div class="lead text-light mb-4" style="font-size: 1.1rem;">
                        <p>{!! nl2br(e(__('Profile Description'))) !!}</p>
                    </div>

                    <div class="tech-stack-container">
                        @php
                            $techs = [
                                ['name' => 'Unreal Engine', 'icon' => 'bi-controller'],
                                ['name' => 'Roblox Studio', 'icon' => 'bi-box'],
                                ['name' => 'Unity', 'icon' => 'bi-unity'],
                                ['name' => 'Laravel', 'icon' => 'bi-layers'],
                                ['name' => 'PHP', 'icon' => 'bi-filetype-php'],
                                ['name' => 'HTML', 'icon' => 'bi-filetype-html'],
                                ['name' => 'CSS', 'icon' => 'bi-filetype-css'],
                                ['name' => 'JS', 'icon' => 'bi-filetype-js'],
                                ['name' => 'Photoshop', 'icon' => 'bi-palette'],
                                ['name' => 'PowerPoint', 'icon' => 'bi-easel'],
                            ];
                        @endphp
                        @foreach($techs as $tech)
                            <div class="tech-item" data-tilt>
                                <i class="bi {{ $tech['icon'] }}"></i>
                                <span>{{ $tech['name'] }}</span>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- SCENE 3: PROJECTS CAROUSEL (Relative Position) -->
    <div class="scene-projects" id="sceneProjects">
        <h2 class="text-center text-white mb-5 display-4 fw-bold"
            style="position: absolute; top: 5%; width: 100%; z-index: 10;">{{ __('My Projects') }}</h2>
        <div class="carousel-container">
            @if($projects->count() > 0)
                <div class="carousel-stage" id="carouselStage">
                    @foreach($projects as $index => $project)
                        @php
                            $youtubeId = null;
                            if ($project->link && (str_contains($project->link, 'youtube.com') || str_contains($project->link, 'youtu.be'))) {
                                preg_match('/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/', $project->link, $matches);
                                $youtubeId = $matches[1] ?? null;
                            }
                        @endphp
                        <div class="carousel-item-3d" data-index="{{ $index }}" data-youtube="{{ $youtubeId }}">
                            @if($youtubeId)
                                <div class="media-container">
                                    <img src="https://img.youtube.com/vi/{{ $youtubeId }}/maxresdefault.jpg" alt="{{ $project->title }}"
                                        class="youtube-thumbnail">
                                    <div class="youtube-overlay">
                                        <i class="bi bi-play-circle-fill"></i>
                                    </div>
                                    <iframe class="youtube-iframe"
                                        data-src="https://www.youtube.com/embed/{{ $youtubeId }}?autoplay=1&mute=1&controls=1&rel=0"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen>
                                    </iframe>
                                </div>
                            @else
                                <img src="{{ $project->image_path ? asset('storage/' . $project->image_path) : 'https://picsum.photos/400/300?random=' . $index }}"
                                    alt="{{ $project->title }}">
                            @endif

                            <div class="content">
                                <h3>{{ $project->title }}</h3>
                                <p>{{ Str::limit($project->description, 80) }}</p>
                                <a href="{{ route('projects.show', $project) }}" class="btn btn-sm btn-outline-primary mt-2">View
                                    Project</a>
                            </div>
                        </div>
                    @endforeach
                </div>
            @else
                <div class="text-center text-white py-5">
                    <i class="bi bi-folder2-open display-1 mb-4 d-block" style="opacity: 0.3;"></i>
                    <h3>Brak projektów</h3>
                    <p class="text-muted">Dodaj swoje projekty z panelu admina, aby wyświetlić je w karuzeli 3D.</p>
                    @auth
                        <a href="{{ route('admin.projects.create') }}" class="btn btn-outline-primary mt-3">
                            <i class="bi bi-plus-circle me-2"></i>Dodaj pierwszy projekt
                        </a>
                    @endauth
                </div>
            @endif
        </div>
    </div>
@endsection