import React from "react";
import PropTypes from "prop-types";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./styles";

const ListaItem = props => {
  const { id, avatar_url, name, login } = props.item;
  const { handleNextPage } = props;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ url: avatar_url }} />
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{login}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNextPage(id)}
      >
        <Icon name="chevron-right" size={16} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

ListaItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    avatar_url: PropTypes.string
  }).isRequired,
  handleNextPage: PropTypes.func.isRequired
};

export default ListaItem;
