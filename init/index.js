const mongoose = require("mongoose");
const List = require("../models/listing");
const init = require("./init.js");

main().then(()=>{
    console.log("db is connected");
})
.catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

const initDB = async () =>{
    await List.deleteMany({});
    const initData = init.map((obj)=> ({
      ...obj,
      user : "6780964431f462711e362eeb"

    }))

    await List.insertMany(initData);
    console.log("data was init")

}

initDB();