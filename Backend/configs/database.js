const mongoose = require('mongoose');

const connection = mongoose.connect("mongodb+srv://arpitkumasahu:arpit@cluster0.nykmdhl.mongodb.net/socialmedia?retryWrites=true&w=majority")



module.exports={
    connection
}