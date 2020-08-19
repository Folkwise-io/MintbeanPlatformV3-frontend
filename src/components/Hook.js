import React, { useState } from "react";

const Hook = () => {
  const [t] = useState(0);
  return <div>T = {t}</div>;
};

export default Hook;
