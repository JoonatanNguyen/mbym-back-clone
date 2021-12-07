import mongoose from "mongoose";

const connect = async () => {
  const dbConnectionString = process.env.DB_CONNECTION_STRING as string;

  await mongoose
    .connect(dbConnectionString)
    .then(() => {
      console.log("Database connected!!", dbConnectionString);
    })
    .catch((err) => {
      // TODO: Log to database
      console.log("Failed to connect to database", err);
    });
};

export default connect;
