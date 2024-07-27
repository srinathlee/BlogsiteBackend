import mongoose from "mongoose";

const dbconnectionprops = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const Dbconfig = async () => {
  mongoose
    .connect(
      "mongodb+srv://srinath_123:O6nx5sCVZHkcrwZK@cluster0.vztzmdl.mongodb.net/blogsite?retryWrites=true&w=majority&appName=Cluster0",
      dbconnectionprops
    )
    .then((data) =>
      console.log(`database is connected at server:${data.connection.host}`)
    )
    .catch((err) => console.log("error while connecting to database"));
};

export default Dbconfig;
