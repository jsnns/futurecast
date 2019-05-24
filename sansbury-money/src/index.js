import ReactDOM from "react-dom";
import { makeMainRoutes } from "./routes";
const routes = makeMainRoutes();

require("dotenv").config();

ReactDOM.render(routes, document.getElementById("root"));
