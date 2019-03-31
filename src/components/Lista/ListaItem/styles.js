import { StyleSheet } from "react-native";
import { colors, metrics } from "~/styles";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: metrics.basePadding,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    marginHorizontal: metrics.baseMargin,
    marginTop: metrics.baseMargin / 2
  },
  image: {
    width: 50,
    height: 50
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: metrics.basePadding,
    width: 230
  },
  title: {
    fontSize: 14,
    fontWeight: "bold"
  },
  description: {},
  button: {},
  icon: {
    color: colors.dark
  }
});

export default styles;
