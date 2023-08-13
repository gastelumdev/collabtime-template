const mongoose = require("mongoose");

exports.config = {
    name: "events",
    altName: "event",
    schemaName: "Event",
    schema: {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false
        },
        date: {
            type: String,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    urls: {
        get: `/events`,
        create: `/events`,
        getOne: `/events/:id`,
        update: `/events/update/:id`,
        delete: `/events/delete/:id`
    }
};