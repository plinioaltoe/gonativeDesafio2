import { StyleSheet } from "react-native";
import { colors, metrics } from "~/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
    justifyContent: "center",
    alignItems: "stretch"
  },
  bar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.light,
    padding: metrics.basePadding / 2,
    marginTop: metrics.baseMargin,
    marginLeft: metrics.baseMargin,
    marginRight: metrics.baseMargin,
    paddingRight: metrics.basePadding * 2,
    borderRadius: metrics.baseRadius
  },
  button: {
    marginLeft: metrics.baseMargin
  },
  textButton: {
    color: colors.regular
  },
  textButtonSelected: {
    color: colors.black,
    fontWeight: "bold"
  }
});

export default styles;
