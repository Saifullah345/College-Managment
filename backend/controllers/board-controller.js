const Board = require("../models/boardSchema.js");
const Session = require("../models/sessionSchema.js");

const boardCreate = async (req, res) => {
  try {
    const { name, address } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Board Name is required" });
    }
    const existingBoard = await Board.findOne({ name });

    if (existingBoard) {
      return res.status(400).json({ error: "Board Name already exists" });
    }

    // Create new district
    const createBoard = new Board({
      name,
      address,
    });

    // Save district to database
    const result = await createBoard.save();

    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const allBoard = async (req, res) => {
  try {
    let board = await Board.find();
    if (board.length > 0) {
      res.send(board);
    } else {
      res.send({ message: "No board found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const sessionCreate = async (req, res) => {
  try {
    const { session } = req.body;

    if (!session) {
      return res.status(400).json({ error: "session is required" });
    }
    const existingSession = await Session.findOne({ session });

    if (existingSession) {
      return res.status(400).json({ error: "session already exists" });
    }

    const createSession = new Session({
      session,
    });

    const result = await createSession.save();

    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { boardCreate, sessionCreate, allBoard };
