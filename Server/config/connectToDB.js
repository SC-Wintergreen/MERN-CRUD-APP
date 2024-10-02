import mongoose from "mongoose";
async function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected To DB Successfully");
    })
    .catch((error) => {
      console.log(error);
    });
}

export default connectToDB;
