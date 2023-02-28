import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getControlDetailsApi } from "../services/qcService";

export const useControlDetails = () => {
  const dispatch = useDispatch();
  const [controlList, setControlList] = useState([]);

  useEffect(() => {
    dispatch(
      getControlDetailsApi((res) => {
        setControlList(res);
      })
    );
  }, []);

  return controlList;
};
