# 📲 Task Manager - Installation & Setup Guide

A step-by-step guide to set up and run the Task Manager application from scratch.

---

## 1️⃣ Prerequisites - What You Need

Before starting, make sure you have these installed on your computer:

### A. Node.js (Required)
- **What it is**: JavaScript runtime that allows you to run backend code
- **Download**: Go to [nodejs.org](https://nodejs.org)
- **Installation**: Download LTS version, run installer, and follow prompts
- **Verify**: Open command prompt/terminal and type:
  ```bash
  node --version
  npm --version
  ```
  (Should show version numbers like v18.x.x)

### B. MongoDB (Required)
- **What it is**: Database for storing tasks and users
- **Download**: Go to [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- **Installation**: Choose your OS, download, and follow installation wizard
- **Start MongoDB**:
  - **Windows**: MongoDB should start as a service automatically
  - **Mac/Linux**: Run `mongod` in terminal
- **Verify**: MongoDB should be listening on `mongodb://127.0.0.1:27017`

### C. Code Editor (Recommended)
- **VS Code**: [code.visualstudio.com](https://code.visualstudio.com) - Free and popular
- **Or any text editor** of your choice

### D. Web Browser (Required)
- Chrome, Firefox, Safari, or Edge (modern version)

---

## 2️⃣ Initial Setup

### Step 1: Navigate to Project Directory
1. Open **Command Prompt** (Windows) or **Terminal** (Mac/Linux)
2. Navigate to your project folder:
   ```bash
   cd "path/to/TaskManagerBackend"
   ```
   Example for Windows:
   ```bash
   cd "C:\Users\Reshma Banu\OneDrive\Desktop\BACKEND TRAINING\TaskManagerBackend"
   ```

### Step 2: Install Dependencies
Run this command to install all required npm packages:
```bash
npm install
```

Wait for it to complete (It will fetch ~100 packages). You should see:
```
added 100 packages in 2s
```

### Step 3: Verify MongoDB is Running
- **Windows**: Check Services or Task Manager (should see MongoDB)
- **Mac/Linux**: Terminal shows `mongod` running
- MongoDB is running on: `mongodb://127.0.0.1:27017`

---

## 3️⃣ Running the Application

### ✅ Terminal 1: Start Backend Server
```bash
npm start
```
or
```bash
node app.js
```

**Expected Output:**
```
MongoDB Connected Successfully
Server running on port 5000
```

✅ **Leave this running** - Don't close this terminal!

---

### ✅ Terminal 2: Start Frontend Server (New Terminal)
1. **Open a NEW terminal/command prompt** (keep the first one running)
2. Navigate to the same project directory:
   ```bash
   cd "path/to/TaskManagerBackend"
   ```
3. Start the frontend server:
   ```bash
   npx http-server -p 3000
   ```

**Expected Output:**
```
Starting up http-server, serving .
Hit CTRL-C to stop the server
http://127.0.0.1:3000
```

✅ **Leave this running too**

---

## 4️⃣ Opening the Application

### Method 1: Browser (Recommended)
1. Open your web browser
2. Go to: `http://localhost:3000/index.html`
3. You should see the **Login/Register page**

### Method 2: Direct File Open
1. Open file explorer
2. Navigate to TaskManagerBackend folder
3. Right-click on `index.html`
4. Select "Open with" → Choose your browser
5. You should see the login page

---

## 5️⃣ First Time Setup - Create Your Account

### Register (SignUp)
1. You'll see the login page
2. Click **"Register here"** link at the bottom
3. Fill in the form:
   - **Full Name**: Your name (e.g., "John Doe")
   - **Email**: Your email (e.g., "john@example.com")
   - **Password**: Strong password (e.g., "MyPass123!")
     - Must be at least 6 characters
     - Better if it has uppercase, numbers, symbols
   - **Confirm Password**: Type password again
4. Watch the **password strength bar** turn green
5. Click **"Register"** button
6. Wait for success message

### Login
1. You'll be redirected to login page
2. Enter your email and password
3. Click **"Login"**
4. You should see the **Dashboard**

---

## 6️⃣ Using the Dashboard

### Main Sections (Sidebar)
- **📊 Dashboard**: Overview and statistics
- **📝 My Tasks**: Create and manage your tasks
- **⚙️ Settings**: Account and preferences

### Creating Your First Task
1. Click **"My Tasks"** in sidebar
2. Click **"New Task"** button
3. Enter task title (e.g., "Learn JavaScript")
4. Click **"Add Task"**
5. Your task appears in the list

### Other Actions
- **✅ Check Task**: Click checkbox to mark as complete
- **🗑️ Delete Task**: Click trash icon to delete
- **👤 View Profile**: Check Settings section
- **🚪 Logout**: Click Logout button at bottom of sidebar

---

## 7️⃣ Troubleshooting

### Problem: "Cannot connect to server"
**Solution:**
1. Check if both terminals are running (backend on 5000, frontend on 3000)
2. Check if MongoDB is running
3. Refresh the browser (Ctrl+R or F5)

### Problem: "MongoDB connection error"
**Solution:**
1. Make sure MongoDB is installed and running
2. Check if MongoDB service is active
3. Restart MongoDB and backend server

### Problem: "Login failed"
**Solution:**
1. Make sure you registered first
2. Check if credentials are correct (case-sensitive)
3. Check browser console for errors (F12 key)

### Problem: "Styles look broken"
**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Refresh page (F5)
3. Close and reopen browser

### Problem: "Can't open index.html"
**Solution:**
1. Make sure you're using the frontend server method
2. Use `http://localhost:3000/index.html` in browser
3. Don't drag file into browser - use address bar

---

## 8️⃣ Understanding the Architecture

### Frontend Files
```
index.html       → Login & Register pages
dashboard.html   → Main application
styles.css       → All styling
auth.js          → Login logic
dashboard.js     → Dashboard & tasks logic
```

### Backend Files
```
app.js                → Main server file
controllers/          → Handle business logic
models/              → Database schemas
middleware/          → Authentication & error handling
services/            → Database operations
```

### How They Communicate
```
Browser (Frontend)
    ↓ (HTTP Requests with JSON)
    ↓
Backend Server (Port 5000)
    ↓ (Queries & Operations)
    ↓
MongoDB Database
```

---

## 9️⃣ Tech Stack Explained

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | HTML5, CSS3, JavaScript | User Interface |
| **Backend** | Node.js, Express | API Server |
| **Database** | MongoDB | Data Storage |
| **Auth** | JWT Tokens | Secure Login |
| **Security** | bcryptjs | Password Hashing |

---

## 🔟 Next Steps & Tips

### ✨ Explore the Code
- Open files in VS Code
- Read comments to understand each function
- Modify CSS to customize colors

### 🎨 Customize
Edit `styles.css` to change:
- Colors (look for `--primary-color`)
- Fonts
- Button styles
- Layout

### 🚀 Add Features
You can add:
- Edit tasks
- Due dates
- Task categories
- Search function
- Export tasks

### 📱 Test on Mobile
1. Find your computer's IP address
2. On your phone, go to: `http://<your-ip>:3000/index.html`
3. Test the responsive design

---

## ❓ Common Questions

### Q: Can I use a different database?
**A**: Yes! Modify connection string in `app.js`

### Q: How do I deploy this?
**A**: Use services like Heroku, Vercel, or AWS

### Q: Can I use different ports?
**A**: Yes! Change 5000 and 3000 in the code

### Q: Is my data secure?
**A**: Yes! Passwords are encrypted with bcryptjs

### Q: Can multiple users use it?
**A**: Yes! Each user has their own account and tasks

---

## 📞 Quick Reference

### Important Commands
```bash
npm install          # Install dependencies (run once)
npm start            # Start backend server
npx http-server -p 3000  # Start frontend server
```

### Important URLs
```
Frontend:  http://localhost:3000/index.html
Backend:   http://localhost:5000
MongoDB:   mongodb://127.0.0.1:27017/taskManagerDB
```

### Important Files
```
app.js              → Backend entry point
index.html          → Frontend entry point
dashboard.html      → Main app page
package.json        → Dependencies list
```

---

## 🎉 You're Ready!

Congratulations! You now have a fully functional Task Manager application.

**What to do next:**
1. Register your account
2. Create some tasks
3. Explore the code
4. Customize it to your liking
5. Learn and have fun!

For detailed documentation, see **FRONTEND_README.md** and **QUICK_START.md**

---

**Happy coding! 💻**
