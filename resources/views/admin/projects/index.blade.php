@extends('layouts.app')

@section('content')
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Projects</h1>
        <a href="{{ route('admin.projects.create') }}" class="btn btn-primary">Add New Project</a>
    </div>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($projects as $project)
                <tr>
                    <td>{{ $project->id }}</td>
                    <td>{{ $project->title }}</td>
                    <td>
                        @if($project->image_path)
                            <img src="{{ asset('storage/' . $project->image_path) }}" width="50" alt="Image">
                        @else
                            N/A
                        @endif
                    </td>
                    <td>
                        <a href="{{ route('admin.projects.edit', $project) }}" class="btn btn-sm btn-warning">Edit</a>
                        <form action="{{ route('admin.projects.destroy', $project) }}" method="POST" class="d-inline"
                            onsubmit="return confirm('Are you sure?')">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-danger">Delete</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection