@extends('layouts.app')

@section('content')
    <h1>Add New Project</h1>

    <form action="{{ route('admin.projects.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" name="title" required>
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" name="description" rows="5" required></textarea>
        </div>
        <div class="mb-3">
            <label for="image" class="form-label">Project Image</label>
            <input type="file" class="form-control" id="image" name="image">
        </div>
        <div class="mb-3">
            <label for="link" class="form-label">Project Link (URL)</label>
            <input type="url" class="form-control" id="link" name="link">
        </div>
        <div class="mb-3">
            <label for="technologies" class="form-label">Technologies (comma separated)</label>
            <input type="text" class="form-control" id="technologies" name="technologies"
                placeholder="Laravel, Vue, Bootstrap">
        </div>
        <button type="submit" class="btn btn-primary">Save Project</button>
    </form>
@endsection