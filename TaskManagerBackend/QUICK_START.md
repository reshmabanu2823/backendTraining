# 🚀 Task Manager - Quick Start Guide

## Prerequisites
- Node.js installed
- MongoDB running locally
- A modern web browser (Chrome, Firefox, Safari, Edge)

## ⚡ 5-Minute Setup

### Step 1: Start the Backend Server
Open a terminal/command prompt in the TaskManagerBackend directory and run:

```bash
npm install  # Only needed once if not done
npm start    # or: node app.js
```

Expected output:
```
MongoDB Connected Successfully
Server running on port 5000
```

### Step 2: Open the Frontend

**Option A: Using a Local Server (Recommended)**
```bash
# In the same directory, open another terminal and run:
npx http-server -p 3000

# Then open: http://localhost:3000/index.html
```

**Option B: Direct File Open**
- Navigate to the TaskManagerBackend folder
- Double-click on `index.html`
- Or open it via your browser (File → Open)

### Step 3: Create an Account
1. Click "Register here" on the login page
2. Fill in your details:
   - Full Name: e.g., "John Doe"
   - Email: e.g., "john@example.com"
   - Password: e.g., "SecurePass123!"
   - Confirm Password
3. Click "Register"

### Step 4: Login & Enjoy!
1. Enter your email and password
2. Click "Login"
3. You'll see your dashboard
4. Click "My Tasks" → "New Task" to create your first task

---

## 📋 File Structure

```
TaskManagerBackend/
├── index.html           ← Login/Register page
├── dashboard.html       ← Main app dashboard
├── styles.css           ← All styling
├── auth.js              ← Login/Register logic
├── dashboard.js         ← Dashboard & task logic
├── FRONTEND_README.md   ← Detailed documentation
├── QUICK_START.md       ← This file
├── app.js               ← Backend server
├── package.json         ← Dependencies
├── controllers/
├── middleware/
├── models/
├── services/
├── utils/
└── data/
```

---

## 🎯 Core Features at a Glance

| Feature | How to Use |
|---------|-----------|
| **Register** | Click Register → Fill form → Submit |
| **Login** | Enter credentials → Click Login |
| **Create Task** | My Tasks → New Task → Enter title → Add |
| **Delete Task** | Hover over task → Click trash icon |
| **Mark Complete** | Check the checkbox on a task |
| **View Stats** | Home/Dashboard tab |
| **Settings** | Click Settings in sidebar |
| **Logout** | Click Logout button |

---

## 🔧 Troubleshooting

### "Cannot connect to backend"
**Solution:**
- Make sure backend is running (should see "Server running on port 5000")
- Check MongoDB is running
- Refresh the browser

### "Login fails with credentials"
**Solution:**
- Double-check your email and password
- Make sure you registered first
- Check browser console (F12 → Console tab)

### "Styles or layout looks broken"
**Solution:**
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Refresh page (Ctrl+R or F5)
- Restart the local server

### "CORS error in console"
**Solution:**
- Update app.js with the CORS middleware (already done)
- Restart the backend server
- Clear browser cache and refresh

---

## 💡 Development Tips

### Using Developer Tools
Press **F12** to open browser developer tools:
- **Console**: See errors and logs
- **Network**: Check API calls
- **Storage**: View localStorage (tokens, settings)

### Testing the API Manually
Use tools like Postman or curl:

```bash
# Register
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"Pass123"}'

# Login
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"Pass123"}'

# Get Tasks
curl http://localhost:5000/tasks

# Create Task
curl -X POST http://localhost:5000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","userId":"john@test.com"}'
```

---

## 🎨 Customization Tips

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;      /* Change this to your brand color */
    --success-color: #10b981;
    --danger-color: #ef4444;
    /* ... more colors ... */
}
```

### Change Backend URL
Edit in `auth.js` and `dashboard.js`:
```javascript
const API_URL = 'http://localhost:5000';  // Change this
```

### Add More Features
- Edit `dashboard.js` to add new functions
- Edit `dashboard.html` to add new UI elements
- Update backend routes in `app.js`

---

## 📚 Next Steps

1. **Read** FRONTEND_README.md for detailed documentation
2. **Explore** the code and understand the architecture
3. **Customize** colors, fonts, and layouts
4. **Add** new features (due dates, categories, etc.)
5. **Deploy** to production when ready

---

## 📞 Quick Links

- Frontend Docs: [FRONTEND_README.md](FRONTEND_README.md)
- Report Issues: Check browser console (F12)
- API Reference: Check `app.js` for all routes

---

## ✨ You're All Set!

Start by opening `index.html` and registering a new account. Happy task managing! 🎉

For more details, see **FRONTEND_README.md**
