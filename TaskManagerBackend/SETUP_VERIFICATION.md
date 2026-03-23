# ✅ Setup Verification Checklist

Use this checklist to verify all components are properly installed and working.

---

## 1. Prerequisites Installation

- [ ] **Node.js Installed**
  ```bash
  node --version  # Should show v14+ or higher
  npm --version   # Should show 6+ or higher
  ```

- [ ] **MongoDB Installed & Running**
  ```bash
  # Windows: Check Services or Task Manager
  # Mac/Linux: Check if mongod process running
  ```

- [ ] **Code Editor Installed** (Optional but recommended)
  - [ ] VS Code or similar editor

- [ ] **Web Browser** (Modern version)
  - [ ] Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

---

## 2. Project Setup

### Backend Setup
- [ ] Navigate to TaskManagerBackend folder
- [ ] Verify `package.json` exists
- [ ] Verify `app.js` exists
- [ ] Verify `controllers/` folder exists
- [ ] Run `npm install`
  ```bash
  cd "c:\Users\Reshma Banu\OneDrive\Desktop\BACKEND TRAINING\TaskManagerBackend"
  npm install
  ```
- [ ] Check for success message (added ~100 packages)

### Frontend Files
- [ ] **index.html** exists
- [ ] **dashboard.html** exists
- [ ] **styles.css** exists
- [ ] **auth.js** exists
- [ ] **dashboard.js** exists

### Documentation Files
- [ ] QUICK_START.md exists
- [ ] INSTALLATION_GUIDE.md exists
- [ ] FRONTEND_README.md exists
- [ ] UI_UX_GUIDE.md exists
- [ ] IMPLEMENTATION_SUMMARY.md exists

---

## 3. Database Verification

### MongoDB
- [ ] MongoDB service is running
- [ ] Can connect to `mongodb://127.0.0.1:27017`
- [ ] Database `taskManagerDB` will be created automatically

**Test connection:**
```bash
# If you have mongosh installed:
mongosh
# Should connect and show no errors
```

---

## 4. Backend Verification

### Start Backend Server
```bash
npm start
# Or: node app.js
```

**Expected Output:**
```
MongoDB Connected Successfully
Server running on port 5000
```

- [ ] Backend starts without errors
- [ ] Port 5000 is accessible
- [ ] MongoDB connection succeeds

### Test Backend Endpoints

**Test with curl or Postman:**

```bash
# Test Register
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"TestPass123\"}"

# Test Login
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"TestPass123\"}"

# Test Get Tasks
curl http://localhost:5000/tasks
```

- [ ] Register endpoint responds (201 or 200)
- [ ] Login endpoint returns token
- [ ] Tasks endpoint returns array (empty or with data)
- [ ] No CORS errors in console

---

## 5. Frontend Verification

### Start Frontend Server
```bash
npx http-server -p 3000
```

**Expected Output:**
```
Starting up http-server, serving .
Hit CTRL-C to stop the server
http://127.0.0.1:3000
```

- [ ] Frontend server starts on port 3000
- [ ] No errors during startup

### Open in Browser
- [ ] Open `http://localhost:3000/index.html`
- [ ] See login/register page
- [ ] Page loads without errors
- [ ] Styling is applied correctly
- [ ] All icons display

---

## 6. Authentication Testing

### Register Test
- [ ] Navigation bar shows "Login" and "Register" links
- [ ] Click "Register" tab shows registration form
- [ ] Form has fields: Name, Email, Password, Confirm Password
- [ ] Password strength bar appears
- [ ] Can submit form
- [ ] Success message appears

**Create test account:**
- Name: Test User
- Email: testuser@example.com
- Password: TestPass123!

Check:
- [ ] Success notification appears
- [ ] Redirected to login page
- [ ] Error handling works (try invalid password)

### Login Test
- [ ] Click "Login" tab
- [ ] Enter test user credentials
- [ ] Password visibility toggle works
- [ ] Click "Login"
- [ ] Loading state shows
- [ ] Redirected to dashboard
- [ ] User name appears in header

---

## 7. Dashboard Verification

### Page Layout
- [ ] Sidebar visible on left (desktop)
- [ ] Main content area shows dashboard
- [ ] Header shows user info
- [ ] Page title says "Dashboard"

### Dashboard Section
- [ ] Welcome message shows user name
- [ ] Statistics cards display with icons
- [ ] Shows Total Tasks, Completed, Pending counts
- [ ] "Add New Task" button visible

### My Tasks Section
- [ ] Click sidebar "My Tasks" link
- [ ] Page title changes to "My Tasks"
- [ ] "New Task" button visible
- [ ] Empty state message appears (if no tasks)

### Create Task
- [ ] Click "New Task" button
- [ ] Add Task box appears
- [ ] Input field is focused
- [ ] Enter task title: "Test Task 1"
- [ ] Click "Add Task" button
- [ ] Success notification appears
- [ ] Task appears in list

Check task item:
- [ ] Shows task title
- [ ] Shows creation date
- [ ] Has checkbox (unchecked)
- [ ] Has delete button (trash icon)

### Manage Task
- [ ] Click checkbox → task appears completed (strikethrough)
- [ ] Uncheck → task appears pending again
- [ ] Click trash icon → confirmation dialog
- [ ] Click confirm → task deleted
- [ ] Success notification appears

### Settings Section
- [ ] Click "Settings" in sidebar
- [ ] Page title changes to "Settings"
- [ ] Shows account information
- [ ] Shows notification toggle
- [ ] Shows dark mode toggle
- [ ] Clear all tasks button visible

### Dark Mode Toggle
- [ ] Click dark mode checkbox
- [ ] Page inverts colors (temporary effect)
- [ ] Can toggle on/off

### Logout
- [ ] Click "Logout" button
- [ ] Confirmation dialog appears
- [ ] Click confirm
- [ ] Redirected to login page
- [ ] Token cleared from storage

---

## 8. UI/UX Verification

### Visual Design
- [ ] Professional, clean layout
- [ ] Consistent color scheme (mostly indigo/blue)
- [ ] Clear typography hierarchy
- [ ] Good contrast (readable text)
- [ ] Proper spacing and alignment

### Responsive Design (Mobile)
- [ ] Resize browser to mobile size (375px)
- [ ] Sidebar collapses to horizontal nav
- [ ] Content remains readable
- [ ] Buttons are touch-friendly
- [ ] No horizontal scrolling

### Animations
- [ ] Form transitions are smooth
- [ ] Task list animations work
- [ ] Notification slide-in animation works
- [ ] Button hover effects visible
- [ ] No jittery or jumpy animations

### Form Validation
- [ ] Try empty form → error message
- [ ] Try invalid email → error message
- [ ] Try short password → error message
- [ ] Try mismatched passwords → error message
- [ ] Error messages are helpful

### Error Handling
- [ ] Try wrong login credentials
- [ ] See error message in notification
- [ ] Try offline (disconnect internet)
- [ ] See error notification
- [ ] Console shows no undefined errors

---

## 9. Browser Testing

Test in each supported browser:

### Chrome
- [ ] No console errors
- [ ] All features work
- [ ] Responsive design works
- [ ] Animations smooth

### Firefox
- [ ] No console errors
- [ ] All features work
- [ ] Responsive design works
- [ ] Animations smooth

### Safari (Mac)
- [ ] No console errors
- [ ] All features work
- [ ] Responsive design works
- [ ] Animations smooth

### Edge
- [ ] No console errors
- [ ] All features work
- [ ] Responsive design works
- [ ] Animations smooth

---

## 10. Network Testing

### Online Mode
- [ ] Backend running on port 5000
- [ ] All API calls work
- [ ] Tasks sync properly

### Check Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Perform actions (register, login, create task)
4. Check requests:
   - [ ] POST /register → Status 200
   - [ ] POST /login → Status 200
   - [ ] GET /tasks → Status 200
   - [ ] POST /tasks → Status 201
   - [ ] DELETE /tasks/:id → Status 200

### Check Response Data
- [ ] Login returns JWT token
- [ ] Tasks endpoint returns array
- [ ] No 404 or 500 errors

---

## 11. Performance Verification

### Page Load
- [ ] Login page loads in < 1 second
- [ ] Dashboard loads in < 1 second
- [ ] No slow scripts or blocking resources

### Lighthouse Test
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run audit for each page
   - [ ] Performance > 90
   - [ ] Accessibility > 90
   - [ ] Best Practices > 90
   - [ ] SEO > 90

---

## 12. Security Checklist

- [ ] Passwords are not shown in URLs
- [ ] JWT token stored in localStorage
- [ ] Token included in API requests
- [ ] No sensitive data in console logs
- [ ] CORS properly configured
- [ ] Password validation enforced
- [ ] HTML injection prevention (XSS)

---

## 13. Documentation Verification

- [ ] QUICK_START.md is readable and helpful
- [ ] INSTALLATION_GUIDE.md has clear steps
- [ ] FRONTEND_README.md documents all features
- [ ] UI_UX_GUIDE.md explains design
- [ ] IMPLEMENTATION_SUMMARY.md is comprehensive

---

## Final Checklist

### All Systems Go? ✅

Before deployment, verify:

- [ ] All prerequisites installed
- [ ] Backend working correctly
- [ ] Frontend loads successfully
- [ ] Registration working
- [ ] Login working
- [ ] Task management working
- [ ] Responsive design working
- [ ] No console errors
- [ ] All UI elements visible
- [ ] Documentation complete

---

## Common Issues & Solutions

### Issue: Backend won't start
```
Solution:
1. Check MongoDB is running
2. Check port 5000 is available
3. Check Node.js is installed
4. Delete node_modules and run npm install again
```

### Issue: Frontend shows blank page
```
Solution:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Check backend is running
3. Check browser console for errors (F12)
4. Verify HTML file path is correct
```

### Issue: Styles not loading
```
Solution:
1. Verify styles.css is in project folder
2. Check CSS file path in HTML
3. Clear browser cache
4. Hard refresh (Ctrl+Shift+R)
```

### Issue: API calls failing
```
Solution:
1. Verify backend is running
2. Check Network tab in DevTools
3. Verify API URL is correct (http://localhost:5000)
4. Check CORS configuration in app.js
```

---

## ✅ Ready to Deploy?

Once all items are checked, you're ready to:
1. Deploy backend to cloud (Heroku, AWS, etc.)
2. Deploy frontend to hosting (Netlify, Vercel, etc.)
3. Update API URL in auth.js and dashboard.js
4. Test deployed application
5. Share with users!

---

**Date Verified**: _______________
**Verified By**: _______________
**Status**: [ ] All OK [ ] Issues Found

---

**Questions?** Refer to:
- QUICK_START.md
- INSTALLATION_GUIDE.md
- FRONTEND_README.md
