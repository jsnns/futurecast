import ReactDOM from "react-dom";
import { makeMainRoutes } from "./routes";

// setup lodash mixins at the start
import "./data/helpers/mixins";

const routes = makeMainRoutes();
require("dotenv").config();

ReactDOM.render(routes, document.getElementById("root"));
