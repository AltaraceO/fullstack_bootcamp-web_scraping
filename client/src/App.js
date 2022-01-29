import "./App.css";
import url from "./api/Api";
import React, { useState } from "react";

function App() {
  const [headlines, setHeadlines] = useState();
  const getData = async () => {
    try {
      const data = await url.get("/");
      setHeadlines(data.data);
      console.log(JSON.stringify(headlines));
    } catch (e) {
      console.log("Something went wrong", e);
    }
  };
  const onHandleClick = () => {
    getData();
  };

  return (
    <>
      {headlines &&
        headlines.map((h, idx) => {
          return (
            <div key={idx}>
              <a href={h.url}>{h.text} </a>
              <br />
            </div>
          );
        })}
      <button onClick={onHandleClick}>Get Headlines</button>
    </>
  );
}

export default App;
