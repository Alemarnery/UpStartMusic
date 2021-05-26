import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import reducers from "./reducers";
import Routes from "./router";
import mongoose from "mongoose";
import "./seeds";

const MONGO_URI =
  "mongodb://alem:alem_123456@cluster0-shard-00-00.cjcds.mongodb.net:27017,cluster0-shard-00-01.cjcds.mongodb.net:27017,cluster0-shard-00-02.cjcds.mongodb.net:27017/cluster0?ssl=true&replicaSet=atlas-hkys6y-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const App = () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

mongoose.connection
  .once("open", () => {
    ReactDOM.render(<App />, document.getElementById("root"));
  })
  .on("error", (error) => console.warn("Warning", error));
