import React, { useState } from "react";

import axios from "axios";

export const Wiki = ({ value }) => {
  const [result, setResult] = useState("phone");
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${value
    .toLowerCase()
    .trim()}`;

  const getWiki = async () => {
    const data = await axios.get(endpoint);
    const snippet = data.data.query.search[0].snippet;
    setResult(snippet.replaceAll(/<\/?span[^>]*>/g, ""));
  };

  getWiki();

  return <div> {result}</div>;
};
