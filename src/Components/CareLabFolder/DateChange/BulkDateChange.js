import { Table } from "antd";
import React from "react";
import CarelabFilter from "../../Common/CarelabFilter";
import Filter from "../../Common/Filter";
import PageHeader from "../../Common/pageHeader";

function BulkDateChange() {
  const columns = [
    {
      title: "SN",
    },
    {
      title: "Name",
    },
    {
      title: "Contact No",
    },
    {
      title: "Collection Date",
    },
    {
      title: "Nep. Collection Date",
    },
    {
      title: "Collection Action",
    },
    {
      title: "Result Date",
    },
    {
      title: "Nep.Result Date",
    },
    {
      title: "Result Action",
    },
  ];
  const returnFilterData = (res) => {
    console.log(res);
  };
  return (
    <>
      <div className="maiTopContainer">
        <PageHeader pageTitle={"Bulk Date Change"} />
        <CarelabFilter
          showSampleIdFromTo
          fiscalService
          returnFilterData={returnFilterData}
        />
      </div>
      <div className="financeCards">
        <h3>Patient Details</h3>
        <Filter onSearch />

        <div className="tableisRes">
          <Table className="tableWidth" columns={columns} />
        </div>
      </div>
    </>
  );
}

export default BulkDateChange;
