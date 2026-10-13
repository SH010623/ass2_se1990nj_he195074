// const { MongoClient } = require("mongodb");
// const dboper = require("./operation");

// const url = "mongodb://127.0.0.1:27017/";
// const dbname = "Newspaper";


// async function main() {
//     const client = new MongoClient(url);

//     try {
//         await client.connect();
//         console.log("Connected correctly to server");

//         const db = client.db(dbname);

//         // CREATE
//         await dboper.insertDocument(
//             db,
//             {
//                 title: "Exploring NodeJS",
//                 author: "Jane Doe",
//                 content: "Learning NodeJS with MongoDB."
//             },
//             "articles"
//         );

//         // READ
//         let docs = await dboper.findDocuments(db, "articles");
//         console.log("Documents:", docs);

//         // UPDATE
//         await dboper.updateDocument(
//             db,
//             { title: "Exploring NodeJS" },
//             { content: "Updated NodeJS article content." },
//             "articles"
//         );

//         docs = await dboper.findDocuments(db, "articles");
//         console.log("After update:", docs);

//         // DELETE
//         await dboper.removeDocument(
//             db,
//             { title: "Exploring NodeJS" },
//             "articles"
//         );

//     } catch (err) {
//         console.error("Error:", err);
//     } finally {
//         await client.close();
//     }
// }

// main();


const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("./routes/bookRouter");
const memberRouter = require("./routes/memberRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/books", bookRouter);
app.use("/members", memberRouter);
//app.use("/loans", loanRouter);

async function startServer() {
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/Lab2_LibraryExam"
        );

        console.log("Connected to MongoDB");

        app.listen(3000, () => {
            console.log("Server running at http://localhost:3000");
        });
    } catch (err) {
        console.error("Connection error:", err.message);
    }
}

startServer();