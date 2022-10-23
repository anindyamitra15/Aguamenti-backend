import mongoose from "mongoose";
import { mongo_uri } from "./envparser";

export default mongoose.connect(mongo_uri, (err) => {
    if(err)console.log("error", err);
    else console.log("Connected to database");
});