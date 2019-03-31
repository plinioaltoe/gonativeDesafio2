import React, { Component } from "react";
import { FlatList } from "react-native";
import ListaItem from "./ListaItem";
import PropTypes from "prop-types";

// import styles from './styles';

class Lista extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        avatar_url: PropTypes.string,
        full_name: PropTypes.string
      })
    ).isRequired,
    handleNextPage: PropTypes.func.isRequired,
    refreshRepositories: PropTypes.func.isRequired,
    refreshing: PropTypes.bool.isRequired
  };

  renderListItem = ({ item }, handleNextPage) => {
    return <ListaItem item={item} handleNextPage={handleNextPage} />;
  };

  render() {
    const {
      list,
      handleNextPage,
      refreshRepositories,
      refreshing
    } = this.props;
    return (
      <FlatList
        data={list}
        keyExtractor={item => String(item.id + Math.random())}
        renderItem={item => this.renderListItem(item, handleNextPage)}
        onRefresh={refreshRepositories}
        refreshing={refreshing}
      />
    );
  }
}

export default Lista;
