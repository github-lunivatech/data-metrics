import { Redirect, Route } from "react-router-dom";
import {
  AsyncAppLayout,
  AsyncRequestorReport,
  AsyncTestTypeReport,
  AsyncReferReport,
  AsyncCareLab,
  AsyncRequestorSalesReport,
  AsyncDailySummary,
  AsyncDailyTransaction,
} from "./App/asyncComponent";
import PrivateRouter from "./Routes/PrivateRouter";

function ReportRoute() {
  return (
    <>
      <Route exact path="/">
        <Redirect to="/datametric" />
      </Route>

      <PrivateRouter
        exact
        path="/datametric"
        component={AsyncCareLab}
        layout={AsyncAppLayout}
      />

      <PrivateRouter
        exact
        path="/datametric/testtype"
        component={AsyncTestTypeReport}
        layout={AsyncAppLayout}
      />

      <PrivateRouter
        exact
        path="/datametric/requestor"
        component={AsyncRequestorReport}
        layout={AsyncAppLayout}
      />

      <PrivateRouter
        exact
        path="/datametric/referer"
        component={AsyncReferReport}
        layout={AsyncAppLayout}
      />

      <PrivateRouter
        exact
        path="/datametric/requestorsales"
        component={AsyncRequestorSalesReport}
        layout={AsyncAppLayout}
        showSider
      />

      <PrivateRouter
        exact
        path="/datametric/dailysummary"
        component={AsyncDailySummary}
        layout={AsyncAppLayout}
        showSider
      />

      <PrivateRouter
        exact
        path="/datametric/dailytransaction"
        component={AsyncDailyTransaction}
        layout={AsyncAppLayout}
        showSider
      />
    </>
  );
}

export default ReportRoute;
