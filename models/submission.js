const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    src: {
        type: String,
    },
    openAt: {
        type: Date,
    },
    closeAt: {
        type: Date,
    },
    courseId: {
        type: String,
    },
});

module.exports = mongoose.model("submission", submissionSchema);