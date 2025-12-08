// Authentication System
function updateNavbar() {
    const isLoggedIn = localStorage.getItem('krematakape_user');
    const navAuthDiv = document.querySelector('nav div');
    
    if (!navAuthDiv) return;
    
    // Clear existing auth links
    const signUpLink = navAuthDiv.querySelector('a[href="SignUp.html"]');
    const loginLink = navAuthDiv.querySelector('a[href="LogIn.html"]');
    const logoutLink = navAuthDiv.querySelector('#logout-link');
    const viewOrdersLink = navAuthDiv.querySelector('#view-orders-link');
    
    if (isLoggedIn) {
        // User is logged in - show logout button and view orders
        if (signUpLink) signUpLink.style.display = 'none';
        if (loginLink) loginLink.style.display = 'none';
        
        if (!viewOrdersLink) {
            const viewOrders = document.createElement('a');
            viewOrders.id = 'view-orders-link';
            viewOrders.href = 'OrderHistory.html';
            viewOrders.textContent = 'View Orders';
            navAuthDiv.insertBefore(viewOrders, navAuthDiv.querySelector('a[href="Cart.html"]'));
        }
        
        if (!logoutLink) {
            const logout = document.createElement('a');
            logout.id = 'logout-link';
            logout.href = '#';
            logout.textContent = 'Log Out';
            logout.style.cursor = 'pointer';
            logout.addEventListener('click', (e) => {
                e.preventDefault();
                logout_user();
            });
            navAuthDiv.insertBefore(logout, navAuthDiv.querySelector('a[href="Cart.html"]'));
        }
    } else {
        // User is not logged in - show signup/login
        if (signUpLink) signUpLink.style.display = 'inline-block';
        if (loginLink) loginLink.style.display = 'inline-block';
        if (logoutLink) logoutLink.remove();
        if (viewOrdersLink) viewOrdersLink.remove();
    }
}

function logout_user() {
    if (confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('krematakape_user');
        updateNavbar();
        alert('You have been logged out.');
        location.href = 'index.html';
    }
}

function login_user(username, email) {
    const userData = {
        username: username,
        email: email,
        loginTime: new Date().toISOString()
    };
    localStorage.setItem('krematakape_user', JSON.stringify(userData));
    updateNavbar();
}

function get_logged_in_user() {
    const user = localStorage.getItem('krematakape_user');
    return user ? JSON.parse(user) : null;
}

// Update navbar when page loads
document.addEventListener('DOMContentLoaded', updateNavbar);
