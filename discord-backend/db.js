const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://theabhik2020:${process.env.DB_PASSWORD}@cluster0.xtkto9t.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Database connected")
}).catch((error) => {
    console.log(error);
});
