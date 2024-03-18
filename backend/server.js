import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
//import multer from "multer"; // For handling multipart/form-data (file uploads)

const port = 8000;
const app = express();
//const upload = multer(); // Create a Multer instance with no configuration

app.use(cors());
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

app.listen(port, () => {
    console.log("Server running on http://localhost:8000 🎉 🚀");
});