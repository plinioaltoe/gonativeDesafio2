import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Issues from "~/pages/Issues";
import Repositories from "~/pages/Repositories";
//import Repositories from "~/pages/Issues";

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Issues,
      Repositories
    },
    {
      initialRouteName: "Repositories"
    }
  )
);

export default Routes;
