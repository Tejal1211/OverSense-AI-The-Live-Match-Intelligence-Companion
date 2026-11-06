import "dotenv/config"; import { app } from "./app.js";
app.listen(+(process.env.PORT || 4000), () => console.log("OverSense API on :" + (process.env.PORT || 4000)));
