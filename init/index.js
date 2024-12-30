const mongoose = require("mongoose");
const List = require("../models/listing");
const inti = require("./init.js");

main().then(()=>{
    console.log("db is connected");
})
.catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

const initDB = async () =>{
    await List.deleteMany({});
    await List.insertMany(inti.init);
    console.log("data was init")

}

initDB();