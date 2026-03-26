document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('customCursorDot');
    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursor.style.left = `${posX}px`;
            cursor.style.top = `${posY}px`;
        });
        document.querySelectorAll('a, button, input, textarea, .portfolio-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Intersection Observer
    const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Login Modal Logic
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close-btn');
    const googleSignIn = document.getElementById('googleSignIn');
    const mainContent = document.getElementById('main-content');
    const dashboard = document.getElementById('dashboard');

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });

    // Mock Google Sign In
    googleSignIn.addEventListener('click', () => {
        // Mock authentication process
        googleSignIn.innerHTML = 'Signing in...';
        googleSignIn.disabled = true;

        setTimeout(() => {
            loginModal.classList.remove('active');
            mainContent.classList.add('hidden');
            document.querySelector('.navbar').classList.add('hidden');
            dashboard.classList.remove('hidden');
            
            // Check if redirecting from checkout
            const urlParams = new URLSearchParams(window.location.search);
            const view = urlParams.get('view') || 'overview';
            renderDashboardView(view);
            updateNavActiveState(view);
            
            googleSignIn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.5185 12.2727C23.5185 11.4227 23.4422 10.6045 23.3004 9.81818H12V14.4591H18.4527C18.1745 15.9591 17.3345 17.2364 16.0582 18.0873V21.0927H19.9418C22.2109 19.0036 23.5185 15.9218 23.5185 12.2727Z" fill="#4285F4"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C15.24 24 17.9564 22.9255 19.9418 21.0927L16.0582 18.0873C14.9836 18.8073 13.6145 19.2382 12 19.2382C8.87455 19.2382 6.22909 17.1273 5.27455 14.2964H1.27636V17.3945C3.25091 21.3164 7.30364 24 12 24Z" fill="#34A853"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.2745#34A853" fill="#FBBC05"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4.76182C13.7618 4.76182 15.3382 5.36727 16.5818 6.55636L20.0291 3.10909C17.9509 1.17818 15.2345 0 12 0C7.30364 0 3.25091 2.68364 1.27636 6.60545L5.27455 9.70364C6.22909 6.87273 8.87455 4.76182 12 4.76182Z" fill="#EA4335"/></svg> Sign in with Google`;
            googleSignIn.disabled = false;
        }, 1200);
    });

    // Dashboard Navigation
    const dashboardNavLinks = document.querySelectorAll('.dashboard-nav a');
    const dashboardContent = document.getElementById('dashboard-content');
    const logoutBtn = document.getElementById('logoutBtn');

    dashboardNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const view = e.currentTarget.dataset.view;
            updateNavActiveState(view);
            renderDashboardView(view);
        });
    });

    logoutBtn.addEventListener('click', () => {
        // Simple reload to reset state
        window.location.href = 'index.html';
    });

    function updateNavActiveState(view) {
        dashboardNavLinks.forEach(link => {
            if (link.dataset.view === view) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function renderDashboardView(view) {
        if (!dashboardContent) return;
        
        // Clear url params without reloading
        window.history.replaceState({}, document.title, window.location.pathname);

        let html = '';
        switch(view) {
            case 'overview':
                html = `
                    <div class="dashboard-header">
                        <h1>Welcome back, John</h1>
                        <a href="checkout.html?plan=starter" class="btn-primary">Start New Project</a>
                    </div>
                    
                    <div class="dashboard-stats">
                        <div class="stat-card">
                            <div class="stat-label">Active Projects</div>
                            <div class="stat-value">0</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-label">Pending Invoices</div>
                            <div class="stat-value">0</div>
                        </div>
                    </div>

                    <div class="dashboard-card">
                        <h2 style="font-size: 1.25rem; margin-bottom: 1rem;">Recent Activity</h2>
                        <p style="color: var(--text-secondary);">No recent activity to show. Start a new project to get going.</p>
                    </div>
                `;
                break;
            case 'projects':
                html = `
                    <div class="dashboard-header">
                        <h1>Your Projects</h1>
                        <button class="btn-primary" onclick="alert('Redirecting to project creation...')">Start New Project</button>
                    </div>
                    
                    <div class="dashboard-card" style="text-align: center; padding: 4rem 2rem;">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--border-color); margin-bottom: 1rem;"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                        <h3 style="margin-bottom: 0.5rem;">No active projects</h3>
                        <p style="color: var(--text-secondary); margin-bottom: 2rem;">You haven't started any projects with us yet.</p>
                        <a href="checkout.html?plan=starter" class="btn-outline">Browse Pricing Plans</a>
                    </div>
                `;
                break;
            case 'invoices':
                html = `
                    <div class="dashboard-header">
                        <h1>Invoices & Billing</h1>
                    </div>
                    
                    <div class="dashboard-card">
                        <table class="invoice-table">
                            <thead>
                                <tr>
                                    <th>Invoice ID</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Mock Data or Empty State -->
                                <tr>
                                    <td colspan="5" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                                        No invoice history found.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `;
                break;
        }
        dashboardContent.innerHTML = html;
    }

    // Handle auto-login if returning from checkout
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('payment_success') === 'true') {
        // Automatically 'login' and show dashboard
        setTimeout(() => {
            mainContent.classList.add('hidden');
            document.querySelector('.navbar').classList.add('hidden');
            dashboard.classList.remove('hidden');
            renderDashboardView('projects');
            updateNavActiveState('projects');
            
            // Re-render empty projects state slightly differently for a new user
            document.getElementById('dashboard-content').innerHTML = `
                <div class="dashboard-header">
                    <h1>Your Projects</h1>
                </div>
                
                <div class="dashboard-card" style="border-left: 4px solid var(--accent-orange);">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h3 style="margin-bottom: 0.5rem;">Website Development (Starter Plan)</h3>
                            <p style="color: var(--text-secondary); font-size: 0.9rem;">Status: <span style="color: var(--accent-orange); font-weight: 500;">Awaiting Requirements</span></p>
                        </div>
                        <button class="btn-primary" onclick="alert('Opening requirements form...')">Upload Requirements</button>
                    </div>
                </div>
            `;
            
            // Make invoices show the mock payment
             dashboardNavLinks.forEach(link => {
                if(link.dataset.view === 'invoices') {
                    link.addEventListener('click', () => {
                         setTimeout(() => {
                             const tbody = document.querySelector('.invoice-table tbody');
                             if(tbody) {
                                  tbody.innerHTML = `
                                    <tr>
                                        <td>#INV-2026-001</td>
                                        <td>Mar 16, 2026</td>
                                        <td>₹10,000</td>
                                        <td><span class="status-badge status-paid">Paid</span></td>
                                        <td><a href="#" style="color: var(--text-primary); text-decoration: underline; font-size: 0.9rem;">Download PDF</a></td>
                                    </tr>
                                  `;
                             }
                         }, 50);
                    });
                }
             })

            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }, 500);
    }
});
