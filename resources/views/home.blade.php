@extends('layouts.app')

@section('content')
    <!-- SCENE 1: INTRO (Relative Position) -->
    <div class="scene-intro" id="sceneIntro">
        <h1 class="intro-text">PORTFOLIO / CV</h1>
    </div>

    <!-- SCENE 2: PROFILE (Relative Position) -->
    <div class="scene-profile" id="sceneProfile">
        <div class="profile-card-3d" id="profileCard">
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
                    <h2 class="display-4 fw-bold text-white mb-3">Konrad Lasota</h2>
                    <p class="lead text-light mb-4">{{ $aboutMe ?? 'Creative Developer & Designer' }}</p>

                    <div class="d-flex flex-wrap gap-2">
                        <span class="badge bg-dark border border-secondary">Laravel</span>
                        <span class="badge bg-dark border border-secondary">Vue.js</span>
                        <span class="badge bg-dark border border-secondary">3D UI</span>
                        <span class="badge bg-dark border border-secondary">Unreal Engine</span>
                        <span class="badge bg-dark border border-secondary">Roblox Studio</span>
                        <span class="badge bg-dark border border-secondary">Photoshop</span>
                        <span class="badge bg-dark border border-secondary">Illustrator</span>
                        <span class="badge bg-dark border border-secondary">Canva</span>
                        <span class="badge bg-dark border border-secondary">PowerPoint</span>
                        <span class="badge bg-dark border border-secondary">Blade</span>
                        <span class="badge bg-dark border border-secondary">CSS</span>
                        <span class="badge bg-dark border border-secondary">JS</span>
                        <span class="badge bg-dark border border-secondary">HTML</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- SCENE 3: PROJECTS CAROUSEL (Relative Position) -->
    <div class="scene-projects" id="sceneProjects">
        <div class="carousel-container">
            <div class="carousel-stage" id="carouselStage">
                @foreach($projects as $index => $project)
                    <div class="carousel-item-3d" style="--i:{{ $index }};">
                        <img src="{{ $project->image_path ? asset('storage/' . $project->image_path) : 'https://picsum.photos/400/300?random=' . $index }}"
                            alt="{{ $project->title }}">
                        <div class="content">
                            <h3>{{ $project->title }}</h3>
                            <p>{{ Str::limit($project->description, 80) }}</p>
                            <a href="{{ route('projects.show', $project) }}"
                                class="btn btn-sm btn-outline-primary mt-2">View</a>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
@endsection