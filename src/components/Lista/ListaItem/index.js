import React from "react";
import PropTypes from "prop-types";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-vector-icons/FontAwesome";

import styles from "./styles";

const ListaItem = ({ id, title, description, avatar }, handleNextPage) => (
  <View style={styles.container}>
    <Image style={styles.image} source={{ uri: avatar }} />
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
    <TouchableOpacity style={styles.button} onPress={() => handleNextPage(id)}>
      <Icon name="chevron-left" size={16} style={styles.icon} />
    </TouchableOpacity>
  </View>
);

ListaItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    avatar: PropTypes.string
  }).isRequired,
  handleNextPage: PropTypes.func.isRequired
};

export default ListaItem;
