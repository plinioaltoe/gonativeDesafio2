import React, { Component } from "react";
import { FlatList } from "react-native";
import ListItem from "./ListaItem";

// import styles from './styles';

class Lista extends Component {
  renderListItem = ({ item }, handleNextPage) => (
    <ListItem item={item} handleNextPage={handleNextPage} />
  );

  render() {
    const { list, handleNextPage } = this.props;
    return (
      <FlatList
        data={list}
        keyExtractor={item => String(item.id)}
        renderItem={item => this.renderListItem(item, handleNextPage)}
      />
    );
  }
}

export default Lista;
