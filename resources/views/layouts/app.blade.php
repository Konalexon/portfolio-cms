<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Portfolio') }}</title>

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <!-- Scripts -->
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>

<body>
    <div class="bg-animation"></div>

    <!-- Floating Navigation -->
    <div class="floating-nav d-flex gap-3 align-items-center">
        <div class="lang-switcher d-flex gap-2">
            <a href="{{ route('lang.switch', 'pl') }}"
                class="lang-link {{ app()->getLocale() == 'pl' ? 'active' : '' }}"
                style="text-decoration: none; color: {{ app()->getLocale() == 'pl' ? '#00f3ff' : 'rgba(255,255,255,0.5)' }}; font-weight: bold;">PL</a>
            <span class="text-white-50">|</span>
            <a href="{{ route('lang.switch', 'en') }}"
                class="lang-link {{ app()->getLocale() == 'en' ? 'active' : '' }}"
                style="text-decoration: none; color: {{ app()->getLocale() == 'en' ? '#00f3ff' : 'rgba(255,255,255,0.5)' }}; font-weight: bold;">EN</a>
        </div>
        <button class="nav-toggle" id="navToggle">
            <i class="bi bi-list"></i>
        </button>
    </div>

    <!-- Admin Link Container -->
    <div class="admin-link-container" id="adminLinkContainer">
        <a href="{{ route('admin.projects.index') }}" class="admin-link">Admin</a>
    </div>

    @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show m-4" role="alert"
            style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 2000;">
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif

    @yield('content')
    </main>

    <footer class="py-4 mt-auto text-center" style="background: transparent !important;">
        <div class="container">
            <small class="text-muted">&copy; {{ date('Y') }} {{ config('app.name', 'Portfolio') }}. Crafted with
                Laravel.</small>
        </div>
    </footer>
    </div>

    <!-- Lightbox Container -->
    <div class="lightbox" id="lightbox">
        <button class="close-lightbox">&times;</button>
        <div class="lightbox-content"></div>
    </div>
</body>

</html>