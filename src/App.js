import "antd/dist/antd.css";
import { Redirect, Route, Switch } from "react-router-dom";
import "./styles/main.scss";
import "./styles/responsive.scss";
import Main from "./components/layout/Main";
import routes from "./routes";

function App() {
  const renderRouteNotInMain = () => {
    const listRoutesNotInMain = routes.filter((item) => item.isInMain == false);
    return listRoutesNotInMain.map((route, key) => (
      <Route path={route.path} component={route.component} key={key} />
    ));
  };

  const renderRouteInMain = () => {
    const listRoutesInMain = routes.filter((item) => item.isInMain != false);
    return listRoutesInMain.map((route, key) => (
      <Route path={route.path} component={route.component} key={key} />
    ));
  };
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/dashboard' />
        </Route>
        {renderRouteNotInMain()}
        <Main>{renderRouteInMain()}</Main>
      </Switch>
    </div>
  );
}

export default App;
