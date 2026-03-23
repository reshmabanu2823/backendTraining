const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    console.log('❌ AUTH ERROR: No authorization header');
    return res.status(401).json({ message: "No token provided" });
  }

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    console.log('❌ AUTH ERROR: Invalid header format:', header);
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = parts[1];
  console.log('🔍 AUTH: Token found, verifying...');

  try {
    const decoded = jwt.verify(token, "secretkey");
    console.log('✅ AUTH: Token verified successfully');
    console.log('   Decoded payload:', JSON.stringify(decoded));
    
    req.user = decoded;
    console.log('   req.user set to:', JSON.stringify(req.user));
    console.log('   req.user.id =', req.user.id);
    console.log('   req.user.id exists:', !!req.user.id);
    
    next();
  } catch (error) {
    console.error('❌ AUTH ERROR: Token verification failed:', error.message);
    res.status(401).json({ message: "Invalid token: " + error.message });
  }
}

module.exports = authMiddleware;