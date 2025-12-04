@extends('layouts.app')

@section('content')
    <div class="container py-5 fade-in-up">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card p-4">
                    <div class="card-body">
                        <h2 class="text-center mb-4" style="color: #bc13fe;">Get In Touch</h2>
                        <p class="text-center mb-5 text-muted">Have a project in mind? Let's talk!</p>

                        <form>
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control bg-transparent text-white border-secondary" id="name"
                                    placeholder="Your Name">
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control bg-transparent text-white border-secondary"
                                    id="email" placeholder="name@example.com">
                            </div>
                            <div class="mb-4">
                                <label for="message" class="form-label">Message</label>
                                <textarea class="form-control bg-transparent text-white border-secondary" id="message"
                                    rows="5" placeholder="Your message..."></textarea>
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary btn-lg">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection