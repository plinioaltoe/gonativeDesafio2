import { StyleSheet } from "react-native";
import { colors, metrics } from "~/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
    padding: metrics.basePadding,
    justifyContent: "center",
    alignItems: "stretch"
  },
  form: {
    display: "flex",
    marginTop: metrics.baseMargin * 2
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    height: 44,
    paddingHorizontal: metrics.basePadding
  },
  button: {},
  icon: {
    color: colors.darker
  }
});

export default styles;
