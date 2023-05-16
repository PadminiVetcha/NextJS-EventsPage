import {
  connectToDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  //console.log(eventId);
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }
  if (req.method === "POST") {
    // add server side validation
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      client.close();
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Added comment.", Comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 }, {eventId: eventId });
      res
        .status(200)
        .json({
          message: "Getting comments successfully!",
          comments: documents,
        });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed!" });
    }
  }
  client.close();
}
export default handler;
