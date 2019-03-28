import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Lista from "~/pages/Lista";
//import Repositories from "~/pages/Issues";

const Routes = createAppContainer(
  createSwitchNavigator({
    Lista
  })
);

export default Routes;
