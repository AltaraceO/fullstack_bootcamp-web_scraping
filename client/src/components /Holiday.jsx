import React, { useState } from "react";
import url from "../api/Api";
import { Wiki } from "./Wiki";

export const Holiday = () => {
  const [rawData, setRawData] = useState();

  const getRawData = async () => {
    try {
      const data = await url.get("/table");
      setRawData(data.data);
    } catch (e) {
      console.log("Something went wrong", e);
    }
  };

  const onHandleClick = () => {
    getRawData();
  };
  return (
    <>
      {rawData &&
        rawData.map((e, idx) => {
          return (
            <div key={idx}>
              <p>On - {e.date}</p>
              <p> {e.values[e.values.length - 2]}</p>
              <Wiki value={e.values[e.values.length - 2]} />
              <hr />
            </div>
          );
        })}
      <button onClick={onHandleClick}>GetData</button>
    </>
  );
};
