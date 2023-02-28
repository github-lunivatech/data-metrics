import React from "react";
import { Input, Row, col } from "antd";

const Search = Input.Search;
const FilterTable = ({ onSearch, ...props }) => {
  return (
    <div className="filter" {...props} style={{ float: "right" }}>
      {/* <Input
        placeholder="Search"
        onSearch={Search}
        style={{ width: 200, border: "1px solid #adadad " }}
      ></Input> */}
      <Search
        placeholder="Search "
        onSearch={Search}
        style={{
          width: 200,
        }}
      />
    </div>
  );
};

export default FilterTable;
