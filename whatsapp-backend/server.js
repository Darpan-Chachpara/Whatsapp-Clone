// WE ARE CREATING AN 'API'
//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from "pusher";
import cors from 'cors';
//app config
const app = express();
const port = process.env.PORT || 9000;
// port were are application will work

const pusher = new Pusher({
    appId: "1203505",
    key: "1972b69432943edc1125",
    secret: "2c186cf1a150a7ec5ee0",
    cluster: "eu",
    useTLS: true
  });

const db = mongoose.connection;
db.once("open", () =>{
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change",(change)=> {
        console.log(change);

        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages","inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        } else {
            console.log("Error Triggering Pusher");
        }
    });
});


// calling api

//middleware
app.use(express.json());
app.use(cors())

// for security purpose ... for chat
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
});


//DB config
const connection_url = 'mongodb+srv://admin:wlgLZu0cQ674ZCCp@cluster0.vsyll.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//?? mongo stuff

//api routes
// '/' is for root or can say base url after '/' what comes will cut 
app.get('/', (req,res) => res.status(200).send('helo world'));
// 200 server is okay 2001 means create
//get,post,delete..etc can be used

app.get('/messages/sync', (req,res) =>{
    Messages.find((err, data) =>{
        if (err) {
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    
    });
});
//find to get al the messages
app.post('/messages/new', (req,res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) =>{
        if (err) {
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    });
});

//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));