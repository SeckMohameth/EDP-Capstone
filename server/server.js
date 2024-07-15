import express from "express";
import { promises as fs } from "fs";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const employeeCollection = process.env.MONGO_DB_COLLECTION_EMPLOYEES;
const feedbackCollection = process.env.MONGO_DB_COLLECTION_FEEDBACK;
const questionsCollection = process.env.MONGO_DB_COLLECTION_QUESTIONS;

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

// Fetch all employees
app.get("/employee", async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(employeeCollection);
        const employees = await collection.find({}).toArray();
        res.json(employees);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error retrieving employees from mongo");
    }
});

// Fetch employee by email
app.get("/employee/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(employeeCollection);
        const result = await collection.findOne({ email: email });
        res.json(result);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error retrieving employee from mongo");
    }
});

// Post a new employee
app.post("/signup", async (req, res) => {
    try {
        const newUser = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(employeeCollection);
        const result = await collection.insertOne(newUser);
        res.status(201).send(`{"_id":"${result.insertedId}"}`);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error posting new user to mongo");
    }
});

// Update existing employee by email
app.put("/employee/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const newData = req.body;
        const filter = { email: email };
        const updateDoc = {
            $set: newData
        }
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(employeeCollection);
        const result = await collection.updateOne(filter, updateDoc)
        res.status(200).send({
            status: "success",
            data: newData,
            message: "User updated successfully."
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error updating employee");
    }
});

// Fetch all feedback
app.get("/feedback", async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(feedbackCollection);
        const result = await collection.find({}).toArray();
        res.json(result);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error retrieving feedback from mongo");
    }
});

// Fetch feedback by id 
app.get("/feedback/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(feedbackCollection);
        const result = await collection.find({ managerID: id }).toArray();
        res.json(result);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error retrieving feedback from mongo");
    }
});

// Post new feedback
app.post("/feedback", async (req, res) => {
    try {
        const newFeedback = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(feedbackCollection);
        const result = await collection.insertOne(newFeedback)
        res.status(201).send(`{"_id":"${result.insertedId}"}`);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error inserting feedback");
    }
});

// Update existing feedback by id
app.put("/feedback/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const filter = { id: id };
        const updateDoc = {
            $set: newData
        }
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(feedbackCollection);
        const result = await collection.updateOne(filter, updateDoc)
        res.status(200).send({
            status: "success",
            data: newData,
            message: "User updated successfully."
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error updating feedback");
    }
});

// Fetch all questions
app.get("/questions", async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(questionsCollection);
        const result = await collection.find({}).toArray();
        res.json(result);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error retrieving questions from mongo");
    }
});

// Fetch questions by id
app.get("/questions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(questionsCollection);
        const result = await collection.find({ employeeID: id }).toArray();
        res.json(result);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error retrieving question from mongo");
    }
});

// Post new question
app.post("/questions", async (req, res) => {
    try {
        const newQuestion = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(questionsCollection);
        const result = await collection.insertOne(newQuestion)
        res.status(201).send(`{"_id":"${result.insertedId}"}`);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error inserting question");
    }
});

// Update questions by id
app.put("/questions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const filter = { id: id };
        const updateDoc = {
            $set: newData
        }
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(questionsCollection);
        const result = await collection.updateOne(filter, updateDoc)
        res.status(200).send({
            status: "success",
            data: newData,
            message: "User updated successfully."
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error updating question");
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const filter = { email: email, password: password };
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(employeeCollection);
        const result = await collection.findOne(filter);
        if (result.email) {
            res.status(200).json({ user: result });
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Redirect route
app.get('*', async (req, res) => {
    res.json(null);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});










// ====== reply routes ====== //

//add a reply to feedback
app.put("/feedback/reply/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const newReply = req.body;
        const filter = {_id: new ObjectId(id)}
        const updateDoc = {
            $push: { replies: newReply }
        };

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(feedbackCollection);
        await collection.updateOne(filter, updateDoc);
        res.status(200).send({
            status: "success",
            data: newReply,
            message: "Reply added successfully."
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error adding reply");
    }
});

// Add a reply to questions
app.put("/questions/reply/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const newReply = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
            $push: { replies: newReply }
        };
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(questionsCollection);
        await collection.updateOne(filter, updateDoc);
        res.status(200).send({
            status: "success",
            data: newReply,
            message: "Reply added successfully."
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error adding reply");
    }
});