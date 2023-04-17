const Todo = require("../models/model");

module.exports.getToDo = async (req, res) => {
    const todo = await Todo.find();
    res.status(201).send(todo);
}

module.exports.saveToDo = async (req, res) => {
    try {
        const text = req.body.text;

        if (text) {
            const textExist = await Todo.findOne({ text: text });
            if (textExist) {
                res.status(201).json({ message: "Todo already exist" });
            } else {
                const result = new Todo({ text: text });
                result.save().then(() => console.log('Todo saved successfully')).catch((e) => console.log(e.message));
                res.status(201).json({ message: "Todo saved successfully" });
            }

        } else {
            res.status(201).json({ message: "Blank todo can't save" });
        }
    } catch (e) {
        console.log(e.message);
    }
}

module.exports.deleteToDo = async (req, res) => {
    try {
        const _id = req.params.id
        if (_id) {
            const textExist = await Todo.findOne({ _id });
            //console.log(textExist);
            if (textExist) {
                Todo
                    .findByIdAndDelete(_id)
                    .then(() => res.set(201).send("Deleted Successfully..."))
                    .catch((err) => console.log(err));
            } else {
                res.status(201).json({ message: "Todo not found" });
            }

        } else {
            res.status(201).json({ message: "Wrong Todo ID" });
        }
    } catch (e) {
        console.log(e.message);
    }

}

module.exports.updateToDo = async (req, res) => {
    try {
        const _id = req.body._id;
        const t = req.body.todoText;
        // console.log(_id);
        // console.log(t);
        await Todo.findByIdAndUpdate(_id, t );
       // const data = res.json();
        res.set(201).send("Updated Successfully...");

    } catch (e) {
        console.log(e.message);
    }

}