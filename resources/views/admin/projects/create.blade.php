@extends('layouts.app')

@section('content')
    <div class="container py-5" style="margin-top: 80px;">
        <h1 class="mb-4">Add New Project</h1>

        <div class="card">
            <div class="card-body">
                @if ($errors->any())
                    <div class="alert alert-danger">
                        <ul class="mb-0">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form action="{{ route('admin.projects.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="mb-3">
                        <label for="title" class="form-label">Title (PL)</label>
                        <input type="text" class="form-control @error('title') is-invalid @enderror" id="title" name="title"
                            value="{{ old('title') }}" required>
                        @error('title')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="mb-3">
                        <label for="title_en" class="form-label">Title (EN)</label>
                        <input type="text" class="form-control @error('title_en') is-invalid @enderror" id="title_en"
                            name="title_en" value="{{ old('title_en') }}">
                        @error('title_en')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description (PL)</label>
                        <textarea class="form-control @error('description') is-invalid @enderror" id="description"
                            name="description" rows="5" required>{{ old('description') }}</textarea>
                        @error('description')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="mb-3">
                        <label for="description_en" class="form-label">Description (EN)</label>
                        <textarea class="form-control @error('description_en') is-invalid @enderror" id="description_en"
                            name="description_en" rows="5">{{ old('description_en') }}</textarea>
                        @error('description_en')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="mb-3">
                        <label for="image" class="form-label">Project Image</label>
                        <input type="file" class="form-control @error('image') is-invalid @enderror" id="image"
                            name="image">
                        @error('image')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="mb-3">
                        <label for="link" class="form-label">Project Link (URL)</label>
                        <input type="url" class="form-control @error('link') is-invalid @enderror" id="link" name="link"
                            value="{{ old('link') }}">
                        @error('link')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="mb-3">
                        <label for="technologies" class="form-label">Technologies (comma separated)</label>
                        <input type="text" class="form-control @error('technologies') is-invalid @enderror"
                            id="technologies" name="technologies" placeholder="Laravel, Vue, Bootstrap"
                            value="{{ old('technologies') }}">
                        @error('technologies')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <button type="submit" class="btn btn-primary">Save Project</button>
                    <a href="{{ route('admin.projects.index') }}" class="btn btn-secondary ms-2">Cancel</a>
                </form>
            </div>
        </div>
    </div>
@endsection