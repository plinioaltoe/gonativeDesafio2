import { StyleSheet } from "react-native";
import { colors, metrics } from "~/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
    justifyContent: "center",
    alignItems: "stretch"
  },
  form: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: metrics.basePadding * 2,
    margin: metrics.baseMargin,
    marginBottom: metrics.baseMargin / 2,
    alignItems: "center",
    borderBottomColor: colors.light,
    borderBottomWidth: 1
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    borderWidth: 1,
    borderColor: colors.light,
    height: 34,
    paddingHorizontal: metrics.basePadding
  },
  button: {
    marginLeft: metrics.baseMargin
  },
  icon: {
    color: colors.darker
  }
});

export default styles;
