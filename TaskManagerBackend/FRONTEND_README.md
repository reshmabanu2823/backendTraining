# Task Manager - Frontend Setup & Documentation

## Overview
A modern, responsive, and user-friendly frontend UI/UX for the TaskManager Backend application. Built with vanilla HTML5, CSS3, and JavaScript.

## 📁 Frontend Files Created

1. **index.html** - Authentication pages (Login & Register)
2. **dashboard.html** - Main dashboard with task management
3. **styles.css** - Complete styling with responsive design
4. **auth.js** - Authentication logic and form handling
5. **dashboard.js** - Dashboard functionality and API integration
6. **README.md** - This file

## 🎯 Features

### Authentication System
- **User Registration** with password validation
  - Password strength indicator
  - Confirm password matching
  - Email validation
  - Minimum name length check
  
- **User Login** with JWT token support
  - Secure password input with toggle visibility
  - Email validation
  - Error handling and user feedback

### Dashboard
- **Welcome Section** with personalized greeting
- **Statistics Cards** showing:
  - Total tasks count
  - Completed tasks
  - Pending tasks

- **Task Management**
  - Create new tasks with simple form
  - View all user tasks in a clean list
  - Delete tasks with confirmation
  - Task completion toggle (checkbox)
  - Display creation date for each task

- **Navigation**
  - Sidebar navigation with smooth transitions
  - Section switching (Dashboard, My Tasks, Settings)
  - Mobile-responsive hamburger menu

- **Settings**
  - View account information
  - Toggle notifications
  - Dark mode toggle
  - Clear all tasks option

### User Experience
- **Real-time Toast Notifications** for all actions
  - Success messages (green)
  - Error messages (red)
  - Info notifications (blue)
  - Auto-dismiss after 4 seconds

- **Responsive Design**
  - Works on desktop, tablet, and mobile
  - Optimized layouts for all screen sizes
  - Touch-friendly buttons and inputs

- **Form Validation**
  - Real-time password strength indicator
  - Email validation
  - Error messages for each field
  - Prevent form submission with invalid data

- **Security**
  - JWT token storage in localStorage
  - Authentication check on page load
  - Automatic redirect to login if not authenticated
  - Secure API calls with authorization headers

- **Modern UI/UX**
  - Clean, professional design
  - Smooth animations and transitions
  - Font Awesome icons throughout
  - Color-coded status indicators
  - Hover effects and visual feedback
  - Loading states for async operations

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB running locally (mongodb://127.0.0.1:27017)
- Backend running on http://localhost:5000

### 1. Start the Backend Server
```bash
cd TaskManagerBackend
npm install  # If not already done
node app.js
```

Expected output:
```
MongoDB Connected Successfully
Server running on port 5000
```

### 2. Open the Frontend
Simply open `index.html` in a modern web browser:
- **Direct file open**: Double-click `index.html` in the file explorer
- **Or** use a local server:
  ```bash
  # Using Python
  python -m http.server 3000
  
  # Or using Node.js (if http-server is installed)
  npx http-server -p 3000
  ```

Then navigate to:
- `http://localhost:3000/index.html` (Login/Register)
- `http://localhost:3000/dashboard.html` (Dashboard)

## 📝 Usage Guide

### First Time User
1. **Register an account**
   - Click "Register here" on the login page
   - Enter your full name, email, and strong password
   - Password must be at least 6 characters
   - Confirm your password
   - Click "Register"

2. **Login**
   - Enter your registered email
   - Enter your password
   - Click "Login"
   - You'll be redirected to the dashboard

### Managing Tasks
1. **Create a Task**
   - Go to "My Tasks" section
   - Click "New Task" button
   - Enter task title (minimum 3 characters)
   - Click "Add Task"

2. **View Tasks**
   - All your tasks appear in the "My Tasks" section
   - Each task shows title and creation date
   - Tasks are sorted by creation date

3. **Mark as Complete**
   - Check the checkbox next to a task
   - Task will be visually marked as completed (strikethrough)

4. **Delete a Task**
   - Click the trash icon on any task
   - Confirm the deletion
   - Task will be removed from the list

5. **Logout**
   - Click "Logout" button in the sidebar
   - Confirm logout
   - You'll be redirected to the login page

## 🎨 Design Features

### Color Scheme
- **Primary**: Indigo (#6366f1)
- **Success**: Green (#10b981)
- **Danger**: Red (#ef4444)
- **Warning**: Amber (#f59e0b)
- **Backgrounds**: Light gray (#f9fafb)
- **Text**: Dark gray (#374151)

### Typography
- Font: Segoe UI, Tahoma, Geneva, Verdana
- Responsive sizing that adapts to screen size
- Custom styling for all form elements

### Components
- **Buttons**: Primary, secondary, success, danger variants
- **Cards**: Stat cards, feature cards, task cards
- **Forms**: Clean, organized form layouts with validation
- **Icons**: Font Awesome icons for visual clarity
- **Notifications**: Toast notifications for feedback

## 📱 Responsive Breakpoints

- **Desktop**: Full layout with sidebar
- **Tablet** (≤768px): Sidebar becomes horizontal top nav
- **Mobile** (≤480px): Compact layout with minimal spacing

## 🔐 Security Notes

- Tokens are stored in localStorage (consider sessionStorage for sensitive apps)
- All API calls include authorization headers
- Password validation enforces minimum requirements
- Email validation prevents invalid entries
- XSS protection with HTML escaping on task titles

## 🐛 Troubleshooting

### Tasks not loading
- Ensure backend is running on http://localhost:5000
- Check browser console for errors (F12)
- Verify MongoDB is running
- Clear localStorage and re-login

### Login fails
- Check if backend server is running
- Verify credentials are correct
- Check browser console for error messages
- Try registering a new account

### CORS errors
- Ensure backend has proper CORS headers
- Check if API URL is correct (http://localhost:5000)

### Styles not loading
- Clear browser cache (Ctrl+Shift+Delete)
- Verify styles.css is in the same directory
- Check file paths in HTML

## 📚 API Integration

The frontend makes requests to these backend endpoints:

```javascript
POST   /register     - Create new user
POST   /login        - Authenticate user (returns JWT token)
GET    /tasks        - Get all tasks
POST   /tasks        - Create new task
DELETE /tasks/:id    - Delete task
GET    /profile      - Protected route (requires token)
```

## 🎓 Code Structure

### auth.js
- Form validation
- Password strength checking
- Login/Register API calls
- Form switching logic
- Error handling

### dashboard.js
- Page initialization
- Task loading and display
- Task creation and deletion
- Stats calculation
- Notification system
- Settings management

### styles.css
- Fixed and relative positioning layouts
- Gradient backgrounds
- Smooth animations
- Responsive grid layouts
- Custom scrollbar styling
- Mobile-first design approach

## 🌟 Key Features Implemented

✅ User registration with validation
✅ Secure login with JWT
✅ Task creation and deletion
✅ Real-time task list updates
✅ User statistics dashboard
✅ Responsive mobile design
✅ Toast notifications
✅ Dark mode toggle
✅ Settings panel
✅ Password visibility toggle
✅ Password strength indicator
✅ Form validation and error messages
✅ Auto-logout on token expiry
✅ Empty state handling
✅ Smooth animations and transitions

## 💡 Future Enhancements

- Edit existing tasks
- Task categories/tags
- Due dates for tasks
- Task priorities
- Search functionality
- Filter by status
- Export tasks
- User profile editing
- Email notifications
- Task reminders
- Collaborative tasks
- Real-time updates with WebSocket

## 📄 License

This frontend is part of the Task Manager Backend project.

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for error messages
3. Verify backend is running correctly
4. Clear browser cache and try again

---

**Happy Task Managing! 🎉**
