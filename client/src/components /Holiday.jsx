import React, { useState } from "react";
import url from "../api/Api";
import { Wiki } from "./Wiki";

export const Holiday = () => {
  const [rawData, setRawData] = useState();

  const getRawData = async () => {
    try {
      const data = await url.get("/table");
      setRawData(data.data);
      console.log(JSON.stringify(data.data));
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
              <p>On these dates - {e.values[0]}</p>
              <p>Celebrate {e.values[1]}</p>
              <Wiki value={e.values[1]} />
              <hr />
            </div>
          );
        })}
      <button onClick={onHandleClick}>GetData</button>
      {/* <Wiki /> */}
    </>
  );
};
