const {app} = require("./app");
require("./controllers");

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})

