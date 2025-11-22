@extends('layouts.app')
@extends('layouts.app')

@section('content')
    <div class="container py-5 fade-in-up">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <a href="{{ route('home') }}" class="btn btn-outline-light mb-4">&larr; Back to Home</a>

                <div class="card overflow-hidden">
                    @if($project->image_path)
                        <img src="{{ asset('storage/' . $project->image_path) }}" class="card-img-top"
                            alt="{{ $project->title }}" style="max-height: 400px; object-fit: cover;">
                    @endif
                    <div class="card-body p-5">
                        <h1 class="display-4 fw-bold mb-3" style="color: #00f3ff;">{{ $project->title }}</h1>

                        <div class="mb-4">
                            @if($project->technologies)
                                @foreach($project->technologies as $tech)
                                    <span
                                        class="badge border border-info text-info bg-transparent me-2 mb-2 px-3 py-2 rounded-pill">{{ $tech }}</span>
                                @endforeach
                            @endif
                        </div>

                        <div class="project-description mb-5">
                            <p class="lead" style="color: rgba(255,255,255,0.9);">{{ $project->description }}</p>
                        </div>

                        @if($project->link)
                            <a href="{{ $project->link }}" target="_blank" class="btn btn-primary btn-lg px-5">
                                Visit Project <i class="bi bi-box-arrow-up-right ms-2"></i>
                            </a>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection