import express from "express";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from a .env file into process.env
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import bcrypt from "bcrypt";
//import multer from "multer"; // For handling multipart/form-data (file uploads)
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";


const port = process.env.PORT || 5000;
const app = express();
//const upload = multer(); // Create a Multer instance with no configuration

app.use(cors());

// bodyparser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

// @name    authUser
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
app.post("/api/users/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (user && bcrypt.compareSync(password, user.password)) {
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
        res.json({ message: "Invalid email or password" });
        // throw new Error("Invalid email or password");
    }
});

// @name    registerUser
// @desc    Register user 
// @route   POST /api/users
// @access  Public
app.post("/api/users", async (req, res) => {
    res.send("register user");
});

// @name    logoutUser
// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
app.post("/api/users/logout", async (req, res) => {
    res.send("logout user");
});

// @name    getUserProfile
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
app.get("/api/users/profile", async (req, res) => {
    res.send("get user profile");
});

// @name    updateUserProfile
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
app.put("/api/users/profile", async (req, res) => {
    res.send("update user profile");
});

// @name    getUsers
// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
// app.get("/api/users", async (req, res) => {
//     res.send("get all users");
// });

// @name    getUserById
// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
// app.get("/api/users/:id", async (req, res) => {
//     res.send("get user by id");
// });

// @name    updateUser
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
// app.put("/api/users/:id", async (req, res) => {
//     res.send("update user");
// });

// @name    deleteUser
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
// app.delete("/api/users/:id", async (req, res) => {
//     res.send("delete user");
// });



app.get("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    res.json(user);
});

app.post("/api/users", async (req, res) => {
    const { name, email, password, role} = req.body;
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
            role,
        },
    });
    res.json(user);
});

app.put("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    const user = await prisma.user.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name,
            email,
            password,
            role,
        },
    });
    res.json(user);
});

app.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.delete({
        where: {
            id: parseInt(id),
        },
    });
    res.json(user);
});

app.get("/api/groups", async (req, res) => {
    const groups = await prisma.group.findMany();
    res.json(groups);
});

app.get("/api/groups/:id", async (req, res) => {
    const { id } = req.params;
    const group = await prisma.group.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    res.json(group);
});

app.post("/api/groups", async (req, res) => {
    const { name, description} = req.body;
    const group = await prisma.group.create({
        data: {
            name,
            description,
        },
    });
    res.json(group);
});

app.put("/api/groups/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const group = await prisma.group.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name,
            description,
        },
    });
    res.json(group);
});

app.delete("/api/groups/:id", async (req, res) => {
    const { id } = req.params;
    const group = await prisma.group.delete({
        where: {
            id: parseInt(id),
        },
    });
    res.json(group);
});

// Get groups of a user
app.get("/api/users/:userId/groups", async (req, res) => {
    const { userId } = req.params;
    const records = await prisma.User_Group.findMany({
        where: {
            userId: parseInt(userId),
        },
    });
    const groupIds = records.map((record) => record.groupId);
    const groups = await prisma.group.findMany({
        where: {
            id: {
                in: groupIds,
            },
        },
    });
    res.json(groups);
});

// Get users of a group
app.get("/api/groups/:groupId/users", async (req, res) => {
    const { groupId } = req.params;
    const records = await prisma.User_Group.findMany({
        where: {
            groupId: parseInt(groupId),
        },
    });
    const userIds = records.map((record) => record.userId);
    const users = await prisma.user.findMany({
        where: {
            id: {
                in: userIds,
            },
        },
    });
    res.json(users);
});

// Add a user to a group
app.post("/api/users/:userId/groups/:groupId", async (req, res) => {
    const { userId, groupId } = req.params;
    const { role } = req.body;

    // Check if a record with the same userId and groupId already exists
    const existingRecord = await prisma.User_Group.findFirst({
        where: {
            userId: parseInt(userId),
            groupId: parseInt(groupId),
        },
    });

    if (existingRecord) {
        // If a record already exists, return an error response
        return res.status(400).json({ error: 'A record with the same userId and groupId already exists' });
    }

    // If no record exists, create a new one
    const record = await prisma.User_Group.create({
        data: {
            userId: parseInt(userId),
            groupId: parseInt(groupId),
            role,
        },
    });

    res.json(record);
});

// Remove a user from a group
app.delete("/api/users/:userId/groups/:groupId", async (req, res) => {
    const { userId, groupId } = req.params;

    const record = await prisma.user_Group.delete({
        where: {
            userId_groupId: {
                userId: parseInt(userId),
                groupId: parseInt(groupId),
            },
        },
    });

    res.json(record);
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log("Server running on http://localhost:8000 🎉 🚀");
});