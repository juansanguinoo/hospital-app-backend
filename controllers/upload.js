import { updateImage } from "../helpers/update-image.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFile = async (req, res) => {
  const { model, id } = req.params;

  const validModels = ["users", "hospitals", "doctors"];

  if (!validModels.includes(model)) {
    return res.status(400).json({
      ok: false,
      msg: "Invalid model",
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No files were uploaded.",
    });
  }

  const file = req.files.image;
  const splittedName = file.name.split(".");
  const fileExtension = splittedName[splittedName.length - 1];

  const validExtensions = ["png", "jpg", "jpeg", "gif"];

  if (!validExtensions.includes(fileExtension)) {
    return res.status(400).json({
      ok: false,
      msg: "Invalid extension",
    });
  }

  const fileName = `${uuidv4()}.${fileExtension}`;
  const path = `./uploads/${model}/${fileName}`;

  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error moving file",
      });
    }

    updateImage(model, id, fileName);

    res.json({
      ok: true,
      msg: "File uploaded",
      fileName,
    });
  });
};

const getImage = (req, res) => {
  const { model, image } = req.params;

  const pathImg = path.join(__dirname, `../uploads/${model}/${image}`);

  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
};

export { uploadFile, getImage };
