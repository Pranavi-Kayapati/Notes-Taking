const express = require("express");
const { NoteModel } = require("../models/noteModel");
const { auth } = require("../middlewares/auth.middleware");

const noteRouter = express.Router();

noteRouter.post("/create", auth, async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.send({ Message: "New note has been created" });
  } catch (error) {
    res.send({ error: error });
  }
});

noteRouter.get("/", auth, async (req, res) => {
  try {
    const notes = await NoteModel.find({ userID: req.body.userID });
    res.send(notes);
  } catch (error) {
    res.send({ error: error });
  }
});

noteRouter.patch("/update/:noteID", auth, async (req, res) => {
  const { noteID } = req.params;
  const note = await NoteModel.findOne({ _id: noteID });
  try {
    if (note.userID !== req.body.userID) {
      res.send({ Message: "You are not authorized" });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body);
      res.send({ Message: "Note is updated successfully" });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

noteRouter.delete("/delete/:noteID", auth, async (req, res) => {
  const { noteID } = req.params;
  const note = await NoteModel.findOne({ _id: noteID });
  try {
    if (note.userID !== req.body.userID) {
      res.send({ Message: "You are not authorized" });
    } else {
      await NoteModel.findByIdAndDelete({ _id: noteID });
      res.send({ Message: "Note is deleted successfully" });
    }
  } catch (error) {
    res.send({ error: error });
  }
});
module.exports = { noteRouter };
