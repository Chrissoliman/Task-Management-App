import { model, models, Schema } from "mongoose";

const taskSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    dueDate: { type: Date },
    category: { type: String, enum: ["personal", "shopping", "work", "other"] },
    completed: {type: Boolean, default: false},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

const Task = models?.Task || model('Task', taskSchema)

export default Task