import React, { Component } from "react";

import {
  View,
  TextInput,
  StatusBar,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

import Lista from "~/components/Lista";

import api from "~/services/api";

export default class Repositories extends Component {
  state = {
    repository: "",
    repositoryList: []
  };

  componentDidMount = () => {
    const repositoryList = AsyncStorage.getItem("@GithubRepo:repositoryList");
    this.setState({ repositoryList });
  };

  checkUserExists = async repository => {
    const repo = await api.get(`/repos/${repository}`);
    return repo;
  };

  saveRepository = async ({ id, name, organization }) => {
    const { avatar_url, login } = organization;
    const { repositoryList } = this.state;
    const newRepo = [...repositoryList, { id, name, login, avatar_url }];
    await AsyncStorage.setItem("@GithubRepo:repositoryList", newRepo);
  };

  addRepository = async () => {
    const { repository } = this.state;

    try {
      const repo = await this.checkUserExists(repository);
      await this.saveRepository(repo);
    } catch (error) {
      console.tron.log("Usuário inexistente");
    }
  };

  handleNextPage = id => {
    const { navigation } = this.props;
    navigation.navigate("Issues");
  };

  render() {
    const { repository } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Header title="GitIssues" />
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Adicionar novo repositório"
            underlineColorAndroid="transparent"
            value={repository}
            onChangeText={text => {
              this.setState({ repository: text });
            }}
          />
          <TouchableOpacity style={styles.button} onPress={this.addRepository}>
            <Icon name="plus" size={16} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Lista />
      </View>
    );
  }
}
