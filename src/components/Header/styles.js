import { StyleSheet } from "react-native";
import { colors, metrics } from "~/styles";
import { getStatusBarHeight } from "react-native-status-bar-height";

const styles = StyleSheet.create({
  container: {
    height: 54 + getStatusBarHeight(),
    paddingTop: getStatusBarHeight(),
    borderBottomColor: colors.light,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: metrics.basePadding,
    backgroundColor: colors.white,
    borderBottomWidth: 1
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.darker
  },
  icon: {
    color: colors.darker
  }
});

export default styles;
