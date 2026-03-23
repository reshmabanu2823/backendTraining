// ============================================
// DASHBOARD PAGE SCRIPT
// ============================================

const API_URL = 'http://localhost:5000';
let userId = null;
let userName = null;
let userEmail = null;

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', async () => {
    // Check authentication
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    const userIdFromStorage = localStorage.getItem('userId');

    console.log('Dashboard Init - Token:', !!token, 'Email:', email, 'UserId:', userIdFromStorage);

    if (!token || !email || !userIdFromStorage) {
        console.log('Missing auth data, redirecting to login');
        // Redirect to login if not authenticated
        window.location.href = 'index.html';
        return;
    }

    // Set global variables
    userEmail = email;
    userId = userIdFromStorage;

    console.log('User authenticated. userId global var:', userId);

    // Set user info in UI
    document.getElementById('user-name').textContent = email.split('@')[0];
    document.getElementById('welcome-name').textContent = email.split('@')[0];
    document.getElementById('settings-name').textContent = email.split('@')[0];
    document.getElementById('settings-email').textContent = email;

    // Initialize event listeners
    initializeEventListeners();

    // Load tasks
    await loadTasks();
});

// Initialize all event listeners
function initializeEventListeners() {
    // Sidebar navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.getAttribute('data-section');
            switchSection(section);
        });
    });

    // Add task buttons
    document.querySelectorAll('#add-task-btn, #add-task-btn-2').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('Add task button clicked');
            const btnId = btn.getAttribute('id');
            
            // If clicked from dashboard, switch to My Tasks section first
            if (btnId === 'add-task-btn') {
                console.log('Dashboard button clicked - switching to My Tasks');
                switchSection('my-tasks');
            }
            
            const addTaskBox = document.getElementById('add-task-box');
            const taskTitle = document.getElementById('task-title');
            
            if (addTaskBox) {
                addTaskBox.style.display = 'block';
                console.log('Task form displayed');
            }
            if (taskTitle) {
                taskTitle.focus();
                console.log('Focus set to input');
            }
        });
    });

    // Cancel task button
    document.getElementById('cancel-task-btn').addEventListener('click', () => {
        document.getElementById('add-task-box').style.display = 'none';
        document.getElementById('taskForm').reset();
    });

    // Task form submission
    document.getElementById('taskForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('task-title').value.trim();
        const errorElement = document.getElementById('task-error-message');

        // Clear previous errors
        errorElement.textContent = '';
        errorElement.style.display = 'none';

        if (!title) {
            errorElement.textContent = 'Please enter a task title';
            errorElement.style.display = 'block';
            document.getElementById('task-title').focus();
            return;
        }

        if (title.length < 3) {
            errorElement.textContent = 'Task title must be at least 3 characters';
            errorElement.style.display = 'block';
            document.getElementById('task-title').focus();
            return;
        }

        console.log('Submitting task:', title);
        await createTask(title);
    });

    // Logout button
    document.getElementById('logout-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userId');
            window.location.href = 'index.html';
        }
    });

    // Sidebar toggle for mobile
    document.getElementById('sidebar-toggle').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('mobile-open');
    });

    // Settings toggles
    document.getElementById('notifications-toggle').addEventListener('change', () => {
        showNotification('Notifications ' + (this.checked ? 'enabled' : 'disabled'), 'success');
    });

    document.getElementById('dark-mode-toggle').addEventListener('change', function() {
        if (this.checked) {
            document.body.style.filter = 'invert(1)';
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.style.filter = 'none';
            localStorage.removeItem('darkMode');
        }
        showNotification('Dark mode ' + (this.checked ? 'enabled' : 'disabled'), 'success');
    });

    // Check dark mode preference
    if (localStorage.getItem('darkMode')) {
        document.getElementById('dark-mode-toggle').checked = true;
        document.body.style.filter = 'invert(1)';
    }

    // Update tasks button
    document.getElementById('update-tasks-btn').addEventListener('click', updateTasksCompletion);

    // Clear all tasks button
    document.getElementById('clear-all-tasks-btn').addEventListener('click', clearAllTasks);
}

// Switch between dashboard sections
function switchSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionName) {
            item.classList.add('active');
        }
    });

    // Show selected section
    const section = document.getElementById(sectionName);
    if (section) {
        section.classList.add('active');
        document.getElementById('page-title').textContent = 
            sectionName === 'dashboard' ? 'Dashboard' : 
            sectionName === 'my-tasks' ? 'My Tasks' : 'Settings';
    }

    // Hide add task box when switching sections
    document.getElementById('add-task-box').style.display = 'none';
}

// Load tasks from backend
async function loadTasks() {
    try {
        console.log('Loading tasks...');
        const response = await fetch(`${API_URL}/tasks`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        console.log('Tasks response status:', response.status);

        if (response.ok) {
            const tasks = await response.json();
            console.log('Tasks loaded:', tasks.length, 'tasks');
            displayTasks(tasks);
            updateStats(tasks);
        } else {
            console.error('Failed to load tasks, status:', response.status);
            const errorText = await response.text();
            console.error('Error response:', errorText);
            displayTasks([]);
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
        showNotification('Error loading tasks', 'error');
        displayTasks([]);
    }
}

// Display tasks in the UI
function displayTasks(tasks) {
    const container = document.getElementById('tasks-container');
    const updateSection = document.getElementById('update-section');
    
    // Tasks are already filtered by user on the backend
    const userTasks = tasks || [];

    if (userTasks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>No tasks yet</h3>
                <p>Create your first task to get started</p>
            </div>
        `;
        updateSection.style.display = 'none';
        return;
    }

    updateSection.style.display = 'block';

    container.innerHTML = userTasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task._id}">
            <div class="task-content">
                <input type="checkbox" class="task-checkbox" data-task-id="${task._id}" ${task.completed ? 'checked' : ''} />
                <div class="task-info">
                    <p class="task-title ${task.completed ? 'completed' : ''}">${escapeHtml(task.title)}</p>
                    <p class="task-date">${formatDate(task.createdAt)}</p>
                </div>
            </div>
            <div class="task-actions">
                <button class="task-btn delete-btn" title="Delete task" data-task-id="${task._id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const taskId = btn.getAttribute('data-task-id');
            if (confirm('Are you sure you want to delete this task?')) {
                await deleteTask(taskId);
            }
        });
    });

    // Add event listeners to checkboxes
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const taskItem = e.target.closest('.task-item');
            const taskTitle = taskItem.querySelector('.task-title');
            
            if (checkbox.checked) {
                taskItem.classList.add('completed');
                taskTitle.classList.add('completed');
            } else {
                taskItem.classList.remove('completed');
                taskTitle.classList.remove('completed');
            }
        });
    });
}

// Update statistics
function updateStats(tasks) {
    // Tasks are already filtered by user on the backend
    const userTasks = tasks || [];
    
    const total = userTasks.length;
    const completed = userTasks.filter(task => task.completed).length;
    const pending = total - completed;

    document.getElementById('total-tasks').textContent = total;
    document.getElementById('completed-tasks').textContent = completed;
    document.getElementById('pending-tasks').textContent = pending;
}

// Create a new task
async function createTask(title) {
    try {
        console.log('\n🔵 FRONTEND: Creating task');
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        
        console.log('Token exists:', !!token);
        console.log('Token:', token ? token.substring(0, 20) + '...' : 'NONE');
        console.log('UserId in localStorage:', userId);

        const requestData = { title };
        console.log('Request body:', requestData);
        console.log('Authorization header: Bearer ' + (token ? token.substring(0, 20) + '...' : 'NONE'));

        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestData)
        });

        console.log('Response status:', response.status);

        if (response.ok) {
            const responseData = await response.json();
            console.log('✅ Task created:', responseData);
            showNotification('Task created successfully!', 'success');
            document.getElementById('taskForm').reset();
            document.getElementById('add-task-box').style.display = 'none';
            document.getElementById('task-error-message').textContent = '';
            
            // Reload tasks
            await loadTasks();
        } else {
            const data = await response.json();
            console.error('❌ Task creation failed:', data);
            const errorMsg = data.message || 'Failed to create task';
            showNotification(errorMsg, 'error');
            document.getElementById('task-error-message').textContent = errorMsg;
            document.getElementById('task-error-message').style.display = 'block';
        }
    } catch (error) {
        console.error('Error creating task:', error);
        const errorMsg = 'An error occurred: ' + error.message;
        showNotification(errorMsg, 'error');
        document.getElementById('task-error-message').textContent = errorMsg;
        document.getElementById('task-error-message').style.display = 'block';
    }
}

// Delete a task
async function deleteTask(taskId) {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            showNotification('Task deleted successfully!', 'success');
            
            // Reload tasks
            await loadTasks();
        } else {
            showNotification('Failed to delete task', 'error');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        showNotification('An error occurred while deleting the task', 'error');
    }
}

// Update tasks completion status
async function updateTasksCompletion() {
    try {
        const checkboxes = document.querySelectorAll('.task-checkbox');
        const updates = [];

        for (const checkbox of checkboxes) {
            const taskId = checkbox.getAttribute('data-task-id');
            const completed = checkbox.checked;

            const updatePromise = fetch(`${API_URL}/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ completed })
            });

            updates.push(updatePromise);
        }

        const responses = await Promise.all(updates);
        const allSuccess = responses.every(res => res.ok);

        if (allSuccess) {
            showNotification('Tasks updated successfully!', 'success');
            await loadTasks();
        } else {
            showNotification('Some tasks failed to update', 'error');
        }
    } catch (error) {
        console.error('Error updating tasks:', error);
        showNotification('An error occurred while updating tasks', 'error');
    }
}

// Clear all tasks
async function clearAllTasks() {
    if (!confirm('Are you sure you want to delete ALL your tasks? This action cannot be undone!')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            showNotification(`All tasks cleared successfully! (${data.deletedCount} tasks deleted)`, 'success');
            await loadTasks();
        } else {
            showNotification('Failed to clear tasks', 'error');
        }
    } catch (error) {
        console.error('Error clearing tasks:', error);
        showNotification('An error occurred while clearing tasks', 'error');
    }
}

// Show notification/toast
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.classList.add('show');

    // Auto-remove notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Show form error
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.color = 'var(--danger-color)';
    }
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Escape HTML to prevent XSS
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Check if token is still valid periodically
setInterval(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
    }
}, 60000); // Check every minute
