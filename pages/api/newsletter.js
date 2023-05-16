import {connectToDatabase, insertDocument} from '../../helpers/db-util';


async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid Email Address." });
      return;
    }
     //storing the entered emails into MongoDB Atlas
    let client;
    try { // trying to connect to mongo db
     client = await connectToDatabase();
    } catch(error) { // unable to connect to db
      res.status(500).json({message: 'Connecting to the database failed!'});
      return; // as after the error we don't want to continue with below code execution
    }

    try{ // successfully connected to db, now trying to insert documents in db
      await insertDocument(client, 'newsletter', { email: userEmail });
      client.close();
    }catch(error) { // unable to insert documents into db
      res.status(500).json({message: 'Inserting data failed!'});
      return;
    }

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
