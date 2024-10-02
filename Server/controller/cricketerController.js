import cricketerModel from "../model/cricketerModel.js";

export async function create(req, res) {
  try {
    let {
      name,
      format,
      jerseyNum,
      nationality,
      innings,
      runs,
      average,
      strikeRate,
    } = req.body;

    name = name.toLowerCase();
    format = format.toLowerCase();
    nationality = nationality.toLowerCase();

    // console.log(name, format);

    const alreadyExists = await cricketerModel.findOne({
      name,
      format,
    });

    if (alreadyExists) {
      return res.status(400).json({
        message: "Cricketer Entry Already Exists With Same Format ",
      });
    }

    const newCricketer = new cricketerModel({
      name,
      format,
      jerseyNum,
      nationality,
      innings,
      runs,
      average,
      strikeRate,
    });
    const savedData = await newCricketer.save();
    res.status(200).json({
      message: `New Record Created Under Name ${savedData.name.toUpperCase()} and  ${savedData.format.toUpperCase()} Format`,
    });
  } catch (error) {
    res.status(500).json({ message: "Action Couldnt Be Performed" });
  }
}

export async function getAllCricketers(req, res) {
  try {
    const userData = await cricketerModel.find();

    if (!userData) {
      return res.status(404).json({ message: "No Cricketer Found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}

export async function getCricketerByID(req, res) {
  try {
    const { id } = req.params;

    const cricketerExists = await cricketerModel.findById(id);

    if (!cricketerExists)
      return res.status(404).json({ message: "No Cricketer Found" });

    res.status(200).json(cricketerExists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateCricketerByID(req, res) {
  try {
    const { id } = req.params;

    const cricketerExists = await cricketerModel.findById(id);

    if (!cricketerExists)
      return res.status(404).json({ message: "No Cricketer Found" });

    let {
      name,
      format,
      jerseyNum,
      nationality,
      innings,
      runs,
      average,
      strikeRate,
    } = req.body;

    name = name.toLowerCase();
    format = format.toLowerCase();
    nationality = nationality.toLowerCase();

    const updatedData = await cricketerModel.findByIdAndUpdate(
      id,
      {
        name,
        format,
        jerseyNum,
        nationality,
        innings,
        runs,
        average,
        strikeRate,
      },
      {
        new: true,
      }
    );

    res.status(200).json({ message: "Cricketer Data Update Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteCricketerByID(req, res) {
  try {
    const { id } = req.params;

    const cricketerExists = await cricketerModel.findById(id);

    if (!cricketerExists)
      return res.status(404).json({ errorMessage: "No Cricketer Found" });

    const deletedData = await cricketerModel.findByIdAndDelete(id);
    res.status(200).json({
      message: `${deletedData.name.toUpperCase()} ${deletedData.format.toUpperCase()} Data Deleted Successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
