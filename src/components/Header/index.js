import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import { withNavigation } from "react-navigation";

class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigateLocation: PropTypes.string,
    navigation: PropTypes.shape({
      navigate: PropTypes.func
    }).isRequired
  };

  backPage = () => {
    const { navigation, navigateLocation } = this.props;
    if (!!navigateLocation) navigation.navigate(navigateLocation);
  };

  render() {
    const { title, navigateLocation } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <TouchableOpacity onPress={this.backPage}>
          {!!navigateLocation && (
            <Icon name="chevron-left" size={16} style={styles.icon} />
          )}
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.right} />
      </View>
    );
  }
}
export default withNavigation(Header);
