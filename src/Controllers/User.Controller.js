import db from "../Configs/DB.Config.js";
import bcrypt from "bcryptjs";
import sendEmailVerification from "../Middlewares/Email.js";

export const RegisterUser = async (req, res) => {
  const { name, email, password } = await req.body;

  // Fields checking
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  try {
    // Check if user already exists
    const [existingUser] = await db.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists, please login.",
      });
    }

    // Generate verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await db.query(
      `INSERT INTO users (name, email, password, verificationCode) VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, verificationCode]
    );

    // sending verification code
    sendEmailVerification(email, verificationCode);

    // returning response
    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const VerifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    // finding the user
    const [user] = await db.query(
      `SELECT * FROM users WHERE verificationCode = ?`,
      [code]
    );

    // checking for the user
    if (user.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid authentication.",
      });
    }

    // get the userDetails
    const userDetails = user[0];

    // Updating the user
    const [updateResult] = await db.query(
      `UPDATE users SET isVerified = ?, verificationCode = ? WHERE id = ?`,
      [true, null, userDetails.id]
    );

    return res.status(200).json({
      success: true,
      message: "User verified successfully.",
      data: updateResult.affectedRows,
    });
  } catch (error) {
    console.log("Error while verifying the email: ", error);
  }
};

export const GetAllUsers = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM users");
    console.log(result);
    return res.status(200).json({
      message: "Viewing all the users",
      result: result,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const GetOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query(
      `SELECT * FROM users where id= ? `,
      [id]
    );

    return res.status(200).json({
      message: "user details",
      result: result,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const CreateUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    return res.status(201).json({
      message: "User created",
      userId: result.insertId,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // finding the existing user
    const [existingUser] = await db.query(
      "SELECT * FROM users where id = ?",
      [id]
    );

    const updatedName = name || existingUser.name;
    const updatedEmail = email || existingUser.email;
    const updatedPassword =
      password || existingUser.password;

    const updatedResult = await db.query(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ? ",
      [updatedName, updatedEmail, updatedPassword, id]
    );

    res.status(201).json({
      message: "User Updated successfully",
      UpdatedUser: { id, name, email, password },
      UpdatedUserDetails: updatedResult,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM  users where id = ?",
      [id]
    );
    res.status(201).json({
      message: "User Deleted Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const DeleteAllUser = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM users");
    res.status(201).json({
      message: "All users deleted",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
