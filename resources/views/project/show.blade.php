@extends('layouts.app')

@section('content')
    <div class="container py-5 fade-in-up">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <a href="{{ route('home') }}" class="btn btn-outline-light mb-4">&larr; {{ __('Back to Home') }}</a>

                <div class="card overflow-hidden bg-transparent border-0">
                    @php
                        $youtubeId = null;
                        if ($project->link && (str_contains($project->link, 'youtube.com') || str_contains($project->link, 'youtu.be'))) {
                            preg_match('/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/', $project->link, $matches);
                            $youtubeId = $matches[1] ?? null;
                        }
                    @endphp

                    @if($youtubeId)
                        <div class="ratio ratio-16x9 mb-4 rounded-4 overflow-hidden border border-secondary shadow-lg">
                            <iframe src="https://www.youtube.com/embed/{{ $youtubeId }}?rel=0" title="YouTube video"
                                allowfullscreen></iframe>
                        </div>
                    @elseif($project->image_path)
                        <img src="{{ asset('storage/' . $project->image_path) }}"
                            class="img-fluid rounded-4 mb-4 border border-secondary shadow-lg w-100" alt="{{ $project->title }}"
                            style="object-fit: cover;">
                    @endif

                    <div class="card-body p-0">
                        <h1 class="display-3 fw-bold mb-4 text-white" style="text-shadow: 0 0 20px rgba(0, 243, 255, 0.3);">
                            {{ $project->title }}
                        </h1>

                        <div class="mb-5">
                            @if($project->technologies)
                                @foreach($project->technologies as $tech)
                                    <span
                                        class="badge border border-info text-info bg-transparent me-2 mb-2 px-3 py-2 rounded-pill fs-6">{{ $tech }}</span>
                                @endforeach
                            @endif
                        </div>

                        <div class="project-description mb-5">
                            <p class="lead text-light" style="line-height: 1.8; font-size: 1.2rem;">
                                {{ $project->description }}
                            </p>
                        </div>

                        @if($project->link && !$youtubeId)
                            <a href="{{ $project->link }}" target="_blank" class="btn btn-primary btn-lg px-5 rounded-pill">
                                {{ __('Visit Project') }} <i class="bi bi-box-arrow-up-right ms-2"></i>
                            </a>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection