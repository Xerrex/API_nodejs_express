console.log("Npm packages \n\n");

const { format } = require("date-fns");
const { v4:uuid4 } = require("uuid"); // Import as defining

const currentDate = new Date();
const dateFormat = "dd-MM-yyyy\tHH:mm:ss"

console.log(format(currentDate, dateFormat));

console.log(`\nUUID: ${uuid4()}`);
