import express from "express";
import { promises as fs } from "fs";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.get("/employees", async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const employees = await collection.find({}).toArray();
        res.json(employees);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error retrieving employees from mongo");
    }
});

app.get("/employees/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
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
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(newUser);
        res.status(201).send(`{"_id":"${result.insertedId}"}`);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error posting new user to mongo");
    }
});

app.put("/employees/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const filter = { id : id};
        const updateDoc = {
            $set: newData
        }
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});