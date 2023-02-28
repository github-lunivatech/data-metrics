import { GetCurrentRemainingStockCountById, GetActualConsumptionReportByDateRange } from '../constants/url'
import { fetch } from '../utils/httpUtil';

export const getStockApi = (data, sucesCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(`${GetCurrentRemainingStockCountById}`);
      if (response?.status === 200) {
        sucesCallback(response?.data?.GetCurrentRemainingStockCountById)
      }
      else
        sucesCallback([])
    } catch (error) {

    }
  }
}

export const getActualConsumApi = (data, sucessCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(`${GetActualConsumptionReportByDateRange}?from=${data.fromdate}&to=${data.todate}`);
      if (response?.status === 200) {
        sucessCallback(response?.data?.GetActualConsumptionReportByDateRange)
      }
      else
        sucessCallback([])
    } catch (error) {

    }
  }
}