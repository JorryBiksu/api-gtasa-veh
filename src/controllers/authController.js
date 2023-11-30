// Import necessary dependencies, Prisma, and any other required modules

import prisma from "../../prisma/client"; // Adjust the path as per your project structure

// Function to authenticate user
const authenticateUser = async (username, password) => {
  try {
    // Find user by username
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    // Check if the user exists
    if (!user) {
      throw new Error("User not found");
    }

    // TODO: Compare the hashed password (you should hash the password during registration)
    // For example, you can use a library like bcrypt for hashing passwords
    // const isPasswordValid = await bcrypt.compare(password, user.password);

    // For demonstration purposes, checking plain text password (not recommended in production)
    if (password !== user.password) {
      throw new Error("Invalid password");
    }

    // Return the authenticated user
    return user;
  } catch (error) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

export default authenticateUser;
