import fs from "fs";

import Post from "../models/postmodel.js";

export const createPost = async (req, res) => {
  try {
    const { photo } = req.files;

    // Validation of inputFeilds
    if (photo.size > 1000000) {
      return res.json({ error: "Size should be less than 1mb" });
    }

    const newPost = new Post({ ...req.feilds });
    newPost.photo.data = fs.readFileSync(photo.path);
    newPost.photo.contentType = photo.type;
    await newPost.save();
    res.send(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
