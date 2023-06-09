import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import {RestaurantsContextProvider} from "./context/RestaurantsContext";

const App = () => {
    return (
        <RestaurantsContextProvider>
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/restaurants/:id' component={RestaurantDetailPage}/>
                        <Route exact path='/restaurants/:id/update' component={UpdatePage}/>
                    </Switch>
                </Router>
            </div>
        </RestaurantsContextProvider>
    )
}
export default App;
