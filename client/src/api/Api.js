import axios from "axios";

let localUrl = "http://localhost:5000/";

if (process.env.NODE_ENV === "production") {
  localUrl = "/";
}

export default axios.create({
  baseURL: localUrl,
});
