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

app.get("/employee/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(employeeCollection);
        const result = await collection.findOne({id : id});
        res.json(result);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error retrieving employees from mongo");
    }
});

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

app.put("/employee/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const filter = { id : id};
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

app.get("/feedback/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(feedbackCollection);
        const result = await collection.find({managerID : id}).toArray();
        res.json(result);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error retrieving feedback from mongo");
    }
});

app.put("/feedback/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const filter = { id : id};
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

app.get("/questions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(questionsCollection);
        const result = await collection.find({employeeID : id}).toArray();
        res.json(result);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error retrieving question from mongo");
    }
});

app.put("/questions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const filter = { id : id};
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

// Redirect route
app.get('*', async (req, res) => {
    res.json(null);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});