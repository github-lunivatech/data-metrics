import { useEffect, useState } from "react";

export const useCarelabReturn = () => {
  const [returnName, setReturnName] = useState("");

  useEffect(() => {
    const pathName = window.location.pathname.split("/")[2];
    let rName = "mainRoute";
    if (pathName === "caredashboard") {
      rName = "mainRoute";
    } else if (pathName === "sampledash") {
      rName = "sampleStatusNav";
    } else if (pathName === "reportdash") {
      rName = "reportStatNav";
    } else if (pathName === "financedash") {
      rName = "financeNav";
    } else if (pathName === "marketingdash") {
      rName = "marketingNav";
    } else if (pathName === "tatdash") {
      rName = "tatNav";
    } else if (pathName === "qcdash") {
      rName = "qcControlNav";
    } else if (newPa === "testanalysis") {
      rName = "bulkNegativeNav";
    }
    setReturnName(rName);
  }, []);

  return returnName;
};
