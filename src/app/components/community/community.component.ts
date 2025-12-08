import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-community',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container py-5">
      <div class="text-center mb-5">
        <h2 class="display-5 fw-bold text-success">Community Connect</h2>
        <p class="lead text-muted">Join the conversation with thousands of other farmers.</p>
        <button class="btn btn-success btn-lg px-4 rounded-pill mt-3">
          <i class="bi bi-plus-lg me-2"></i> Start New Discussion
        </button>
      </div>

      <div class="row">
        <div class="col-lg-9 mx-auto">
          <!-- Filter Tabs -->
          <ul class="nav nav-pills mb-4 justify-content-center">
            <li class="nav-item">
              <a class="nav-link active bg-success text-white" href="javascript:void(0)">All Topics</a>
            </li>
            <li class="nav-item"><a class="nav-link text-success" href="javascript:void(0)">Farming Tips</a></li>
            <li class="nav-item"><a class="nav-link text-success" href="javascript:void(0)">Machinery Support</a></li>
            <li class="nav-item"><a class="nav-link text-success" href="javascript:void(0)">Government Schemes</a></li>
          </ul>

          <!-- Forum List -->
          <div class="list-group shadow-sm">
            <div class="list-group-item list-group-item-action p-4 border-start-0 border-end-0">
              <div class="d-flex w-100 justify-content-between align-items-center">
                <h5 class="mb-1 text-success fw-bold">Best fertilizer for Cotton in black soil?</h5>
                <small class="text-muted">3 mins ago</small>
              </div>
              <p class="mb-2 text-secondary">I noticed some yellowing leaves on my cotton crop. Currently using DAP per acre...</p>
              <div class="d-flex align-items-center mt-2">
                <div class="d-flex align-items-center me-4">
                  <div class="bg-light rounded-circle p-2 me-2">👤</div>
                  <small class="fw-bold">Ramesh K.</small>
                </div>
                <small class="text-muted me-3"><i class="bi bi-chat-dots me-1"></i> 12 Replies</small>
                <small class="text-muted"><i class="bi bi-eye me-1"></i> 45 Views</small>
                <span class="badge bg-light text-dark border ms-auto">Fertilizers</span>
              </div>
            </div>

            <div class="list-group-item list-group-item-action p-4 border-start-0 border-end-0">
              <div class="d-flex w-100 justify-content-between align-items-center">
                <h5 class="mb-1 text-success fw-bold">Mahindra vs John Deere Tractor review</h5>
                <small class="text-muted">2 hours ago</small>
              </div>
              <p class="mb-2 text-secondary">Planning to buy a 50HP tractor for ploughing 20 acres. Need advice on fuel efficiency...</p>
              <div class="d-flex align-items-center mt-2">
                <div class="d-flex align-items-center me-4">
                  <div class="bg-light rounded-circle p-2 me-2">👤</div>
                  <small class="fw-bold">Suresh P.</small>
                </div>
                <small class="text-muted me-3"><i class="bi bi-chat-dots me-1"></i> 28 Replies</small>
                <small class="text-muted"><i class="bi bi-eye me-1"></i> 156 Views</small>
                <span class="badge bg-light text-dark border ms-auto">Machinery</span>
              </div>
            </div>

            <div class="list-group-item list-group-item-action p-4 border-start-0 border-end-0">
              <div class="d-flex w-100 justify-content-between align-items-center">
                <h5 class="mb-1 text-success fw-bold">New subsidy for Drip Irrigation 2024</h5>
                <small class="text-muted">1 day ago</small>
              </div>
              <p class="mb-2 text-secondary">Can anyone guide me on the documents required for the PMKSY drip irrigation subsidy scheme?</p>
              <div class="d-flex align-items-center mt-2">
                <div class="d-flex align-items-center me-4">
                  <div class="bg-light rounded-circle p-2 me-2">👤</div>
                  <small class="fw-bold">Anita R.</small>
                </div>
                <small class="text-muted me-3"><i class="bi bi-chat-dots me-1"></i> 8 Replies</small>
                <small class="text-muted"><i class="bi bi-eye me-1"></i> 340 Views</small>
                <span class="badge bg-light text-dark border ms-auto">Schemes</span>
              </div>
            </div>
          </div>
          
          <div class="text-center mt-4">
            <button class="btn btn-outline-success">Load More Discussions</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CommunityComponent { }
