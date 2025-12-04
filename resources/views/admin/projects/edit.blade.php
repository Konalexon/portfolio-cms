@extends('layouts.app')

@section('content')
    <div class="container py-5" style="margin-top: 80px;">
        <h1 class="mb-4">Edit Project</h1>

        <div class="card">
            <div class="card-body">
                <form action="{{ route('admin.projects.update', $project) }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <div class="mb-3">
                        <label for="title" class="form-label">Title (PL)</label>
                        <input type="text" class="form-control" id="title" name="title"
                            value="{{ $project->getAttributes()['title'] }}" required>
                    </div>
                    <div class="mb-3">
                        <label for="title_en" class="form-label">Title (EN)</label>
                        <input type="text" class="form-control" id="title_en" name="title_en"
                            value="{{ $project->getAttributes()['title_en'] ?? '' }}">
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description (PL)</label>
                        <textarea class="form-control" id="description" name="description" rows="5"
                            required>{{ $project->getAttributes()['description'] }}</textarea>
                    </div>
                    <div class="mb-3">
                        <label for="description_en" class="form-label">Description (EN)</label>
                        <textarea class="form-control" id="description_en" name="description_en"
                            rows="5">{{ $project->getAttributes()['description_en'] ?? '' }}</textarea>
                    </div>
                    <div class="mb-3">
                        <label for="image" class="form-label">Project Image</label>
                        @if($project->image_path)
                            <div class="mb-2">
                                <img src="{{ asset('storage/' . $project->image_path) }}" width="100" alt="Current Image"
                                    class="rounded">
                            </div>
                        @endif
                        <input type="file" class="form-control" id="image" name="image">
                    </div>
                    <div class="mb-3">
                        <label for="link" class="form-label">Project Link (URL)</label>
                        <input type="url" class="form-control" id="link" name="link" value="{{ $project->link }}">
                    </div>
                    <div class="mb-3">
                        <label for="technologies" class="form-label">Technologies (comma separated)</label>
                        <input type="text" class="form-control" id="technologies" name="technologies"
                            value="{{ is_array($project->technologies) ? implode(', ', $project->technologies) : $project->technologies }}">
                    </div>
                    <button type="submit" class="btn btn-primary">Update Project</button>
                    <a href="{{ route('admin.projects.index') }}" class="btn btn-secondary ms-2">Cancel</a>
                </form>
            </div>
        </div>
    </div>
@endsection