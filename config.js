const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const url = "mongodb+srv://chemasantos:Lapolla6611%25@cluster0-h8qan.mongodb.net/graphqldb?retryWrites=true";

mongoose.connect(url, {
    useNewUrlParser: true
});

mongoose.connection.once("open",
    () => console.log(`Connected to mongo at ${url}`)
);

