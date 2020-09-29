import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { routes } from "./routes";
import { Provider as ReduxProvider } from "react-redux";
import { IntercomProvider } from "react-use-intercom";

import "./styles/index.css";
import { GlobalLayout } from "./views/layouts";
import { Store } from "redux";

import { Context } from "./context/contextBuilder";
import { MbContextProvider } from "./context/MbContextProvider";
import ScrollToTop from "./views/components/ScrollToTop";

interface Props {
  store: Store;
  context: Context;
}

const INTERCOM_APP_ID = process.env.INTERCOM_APP_ID || "cnqttk95"; // falls back to prod id (note: prod id does not work on localhost)
const App: React.FC<Props> = ({ store, context }) => {
  const [ctx] = useState(context); // set context to local state to prevent re-renders
  return (
    <MbContextProvider context={ctx}>
      <ReduxProvider store={store}>
        <Router>
          <IntercomProvider appId={INTERCOM_APP_ID}>
            <ScrollToTop />
            <GlobalLayout>
              <Switch>
                {/* In V2, the project links were of form /project/:id. In V3, the project links are of the form
                /projects/:id. Since the V2 links may have been shared on social media, we must ensure the old links
                still work. This is accomplished by the Route below, which redirects /project/:id to /projects/:id.
                The same fix needs to be done to map /mb-event/:id in V2 to /meets/:id in V3.  */}
                <Route
                  exact
                  path="/project/:id"
                  render={(props) => <Redirect to={`/projects/${props.match.params.id}`} />}
                />
                <Route
                  exact
                  path="/mb-event/:id"
                  render={(props) => <Redirect to={`/meets/${props.match.params.id}`} />}
                />
                {routes.map((route) => (
                  <Route key={route.path || "404"} {...route} />
                ))}
              </Switch>
            </GlobalLayout>
          </IntercomProvider>
        </Router>
      </ReduxProvider>
    </MbContextProvider>
  );
};

export default App;
