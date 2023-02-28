import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { careLabFiscalCodeApi } from "../services/careLabService";
// import { careLabFiscalCodeApi } from "../../services/careLabService";

export const useFiscalYear = () => {
  const dispatch = useDispatch();
  const [fiscalList, setFiscalList] = useState([]);

  useEffect(() => {
    dispatch(
      careLabFiscalCodeApi((res) => {
        setFiscalList(res);
      })
    );
  }, []);

  return fiscalList;
};
