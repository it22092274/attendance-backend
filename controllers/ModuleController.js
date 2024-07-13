const { ModuleModel } = require("../models/ModuleModel");

const addModule = async (req, res) => {
    const { year, semester, module, batch, time, lectureremail, dayOfWeek } = req.body;

    try {
        const newModule = new ModuleModel({
            year,
            semester,
            module,
            batch,
            time,
            lectureremail,
            dayOfWeek,
        });
        await newModule.save();
        return res.status(201).json({ message: "Module added successfully", newModule });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error adding module", error });
    }
};

const updateModule = async (req, res) => {
    const { year, semester, module, batch, time, lectureremail, dayOfWeek } = req.body;
    const { id } = req.params;

    try {
        const updatedModule = await ModuleModel.findByIdAndUpdate(
            id,
            {
                year,
                semester,
                module,
                batch,
                time,
                lectureremail,
                dayOfWeek,
            },
            { new: true }
        );
        if (!updatedModule) {
            return res.status(404).json({ message: "Module not found" });
        }

        return res.status(200).json({ message: "Module updated successfully", updatedModule });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating module", error });
    }
};

const readModule = async (req, res) => {
    const { email } = req.params;

    try {
        const modules = await ModuleModel.find({ lectureremail: email });
        return res.status(200).json(modules);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving modules", error });
    }
};

const deleteModule = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedModule = await ModuleModel.findByIdAndDelete(id);
        if (!deletedModule) {
            return res.status(404).json({ message: "Module not found" });
        }
        return res.status(200).json({ message: "Module deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting module", error });
    }
};

module.exports = {
    addModule,
    updateModule,
    readModule,
    deleteModule
};
