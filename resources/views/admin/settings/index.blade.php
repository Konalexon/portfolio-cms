@extends('layouts.app')

@section('content')
    <h1>Settings</h1>

    <form action="{{ route('admin.settings.update') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label for="about_me" class="form-label">About Me</label>
            <textarea class="form-control" id="about_me" name="about_me"
                rows="10">{{ $settings['about_me'] ?? '' }}</textarea>
        </div>
        <!-- Add more settings here if needed -->
        <button type="submit" class="btn btn-primary">Save Settings</button>
    </form>
@endsection