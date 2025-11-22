@extends('layouts.app')

@section('content')
    <h1>Edit Project</h1>

    <form action="{{ route('admin.projects.update', $project) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" name="title" value="{{ $project->title }}" required>
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" name="description" rows="5"
                required>{{ $project->description }}</textarea>
        </div>
        <div class="mb-3">
            <label for="image" class="form-label">Project Image</label>
            @if($project->image_path)
                <div class="mb-2">
                    <img src="{{ asset('storage/' . $project->image_path) }}" width="100" alt="Current Image">
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
    </form>
@endsection