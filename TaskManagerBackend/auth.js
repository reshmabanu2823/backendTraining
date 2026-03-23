// ============================================
// AUTHENTICATION PAGE SCRIPT
// ============================================

const API_URL = 'http://localhost:5000';

// Form switching
document.querySelectorAll('.switch-form, .nav-link').forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        const formType = element.getAttribute('data-form');
        if (formType) {
            switchForm(formType);
        }
    });
});

function switchForm(formType) {
    // Hide all forms
    document.querySelectorAll('.form-container').forEach(form => {
        form.classList.remove('active-form');
    });

    // Show selected form
    const form = document.getElementById(`${formType}-form`);
    if (form) {
        form.classList.add('active-form');
    }

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-form') === formType) {
            link.classList.add('active');
        }
    });

    // Clear messages and errors
    clearMessages();
    clearErrors();
}

// Password visibility toggle
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.getAttribute('data-target');
        const input = document.getElementById(targetId);
        
        if (input.type === 'password') {
            input.type = 'text';
            button.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
            input.type = 'password';
            button.innerHTML = '<i class="fas fa-eye"></i>';
        }
    });
});

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    // Clear previous messages
    clearMessages();
    clearErrors();

    // Validation
    if (!validateEmail(email)) {
        showError('login-email-error', 'Please enter a valid email address');
        return;
    }

    if (password.length < 6) {
        showError('login-password-error', 'Password must be at least 6 characters');
        return;
    }

    try {
        showMessage('login-message', 'Logging in...', 'loading');

        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        console.log('Login response:', { status: response.status, data });

        if (response.ok) {
            // Store token and user info
            localStorage.setItem('token', data.token);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userId', data.userId);
            
            showMessage('login-message', 'Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            const errorMsg = data.message || 'Login failed. Please try again.';
            console.error('Login error:', errorMsg);
            showMessage('login-message', errorMsg, 'error');
        }
    } catch (error) {
        console.error('Login fetch error:', error);
        showMessage('login-message', 'Connection error: ' + error.message, 'error');
    }
});

// Register Form Handler
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    // Clear previous messages
    clearMessages();
    clearErrors();

    // Validation
    if (name.length < 3) {
        showError('register-name-error', 'Name must be at least 3 characters');
        return;
    }

    if (!validateEmail(email)) {
        showError('register-email-error', 'Please enter a valid email address');
        return;
    }

    if (password.length < 6) {
        showError('register-password-error', 'Password must be at least 6 characters');
        return;
    }

    if (password !== confirmPassword) {
        showError('register-confirm-error', 'Passwords do not match');
        return;
    }

    // Check password strength
    const strength = getPasswordStrength(password);
    if (strength < 2) {
        showError('register-password-error', 'Password is too weak. Use uppercase, numbers, or symbols.');
        return;
    }

    try {
        showMessage('register-message', 'Creating account...', 'loading');

        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        console.log('Register response:', { status: response.status, data });

        if (response.ok) {
            showMessage('register-message', 'Account created successfully! Redirecting to login...', 'success');
            
            setTimeout(() => {
                document.getElementById('registerForm').reset();
                switchForm('login');
                showMessage('login-message', 'Please login with your new account', 'info');
            }, 2000);
        } else {
            const errorMsg = data.message || 'Registration failed. Please try again.';
            console.error('Registration error:', errorMsg);
            showMessage('register-message', errorMsg, 'error');
        }
    } catch (error) {
        console.error('Register fetch error:', error);
        showMessage('register-message', 'Connection error: ' + error.message, 'error');
    }
});

// Show error message
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

// Show message
function showMessage(elementId, message, type = 'info') {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.className = `form-message ${type}`;
        element.style.display = 'block';
    }
}

// Clear all messages
function clearMessages() {
    document.querySelectorAll('.form-message').forEach(el => {
        el.textContent = '';
        el.className = 'form-message';
    });
}

// Clear all errors
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
}

// Email validation
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Password strength checker
function getPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    return strength;
}

// Real-time password strength indicator
document.getElementById('register-password').addEventListener('input', (e) => {
    const password = e.target.value;
    const strengthMeter = document.querySelector('.strength-meter');
    const strength = getPasswordStrength(password);
    
    const widths = ['0%', '25%', '50%', '75%', '100%'];
    const colors = [
        'var(--danger-color)',
        'var(--warning-color)',
        '#f59e0b',
        '#10b981',
        'var(--success-color)'
    ];

    if (strengthMeter) {
        strengthMeter.style.width = widths[strength];
        strengthMeter.style.backgroundColor = colors[strength];
    }
});

// Prevent form submission on enter in password field
document.querySelectorAll('input[type="password"]').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const form = input.closest('form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
});

// Auto-focus on page load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-email').focus();
});
