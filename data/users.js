// Simple user database - only allowed users can access
let allowedUsers = [
  {
    id: 1,
    email: "echankinson@gmail.com",
    password: "eric",
    name: "Eric Hankinson",
    role: "admin" // admin can add/remove users
  },
  {
    id: 2,
    email: "test@test.com",
    password: "eric",
    name: "Test User",
    role: "user"
  }
];

// Get next available ID
function getNextId() {
  return Math.max(...allowedUsers.map(u => u.id), 0) + 1;
}

// Function to check if login is valid
export function validateLogin(email, password) {
  const user = allowedUsers.find(u => 
    u.email.toLowerCase() === email.toLowerCase() && 
    u.password === password
  );
  
  if (user) {
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }
  
  return {
    success: false,
    error: "Invalid email or password"
  };
}

// Check if user has admin privileges
export function isAdmin(userEmail) {
  const user = allowedUsers.find(u => u.email.toLowerCase() === userEmail.toLowerCase());
  return user && user.role === 'admin';
}

// Add a new user (admin only)
export function addUser(newUserData, adminEmail) {
  try {
    // Check if requester is admin
    if (!isAdmin(adminEmail)) {
      return {
        success: false,
        error: "Only administrators can add new users"
      };
    }

    // Validate input
    if (!newUserData.email || !newUserData.password || !newUserData.name) {
      return {
        success: false,
        error: "Email, password, and name are required"
      };
    }

    // Check if user already exists
    const existingUser = allowedUsers.find(u => 
      u.email.toLowerCase() === newUserData.email.toLowerCase()
    );
    
    if (existingUser) {
      return {
        success: false,
        error: "User with this email already exists"
      };
    }

    // Add new user
    const newUser = {
      id: getNextId(),
      email: newUserData.email.toLowerCase(),
      password: newUserData.password,
      name: newUserData.name,
      role: newUserData.role || 'user'
    };

    allowedUsers.push(newUser);

    return {
      success: true,
      message: `User ${newUser.name} added successfully`,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to add user: " + error.message
    };
  }
}

// Get all users (admin only)
export function getAllUsers(adminEmail) {
  if (!isAdmin(adminEmail)) {
    return {
      success: false,
      error: "Only administrators can view all users"
    };
  }

  return {
    success: true,
    users: allowedUsers.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }))
  };
}

// Delete a user (admin only)
export function deleteUser(userId, adminEmail) {
  try {
    // Check if requester is admin
    if (!isAdmin(adminEmail)) {
      return {
        success: false,
        error: "Only administrators can delete users"
      };
    }

    // Find user to delete
    const userIndex = allowedUsers.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return {
        success: false,
        error: "User not found"
      };
    }

    // Don't allow deleting yourself
    const userToDelete = allowedUsers[userIndex];
    if (userToDelete.email.toLowerCase() === adminEmail.toLowerCase()) {
      return {
        success: false,
        error: "You cannot delete your own account"
      };
    }

    // Remove user
    allowedUsers.splice(userIndex, 1);

    return {
      success: true,
      message: `User ${userToDelete.name} deleted successfully`
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to delete user: " + error.message
    };
  }
}