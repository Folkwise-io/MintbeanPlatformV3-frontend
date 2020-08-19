import React, { useState } from "react";

const Hook = () => {
  const [t] = useState(0);
  return <div className="text-4xl">T = {t}</div>;
};

export default Hook;
