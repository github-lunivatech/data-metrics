import React from "react";
import { Input } from "antd";

import Filter from "../../Common/Filter";
import PageHeader from "../../Common/pageHeader";
import CarelabFilter from "../../Common/CarelabFilter";

const ExpenseManagement = () => {
  return (
    <>
      <div className="maiTopContainer">
        <PageHeader pageTitle={"Expense Management"} />

        <Filter dateRange serchButton />
      </div>
    </>
  );
};

export default ExpenseManagement;
