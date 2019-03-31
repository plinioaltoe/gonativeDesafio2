import React, { Component } from "react";

import {
  View,
  TextInput,
  StatusBar,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
  Text
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

import Lista from "~/components/Lista";
import Header from "~/components/Header";
import api from "~/services/api";

export default class Repositories extends Component {
  state = {
    repository: "react-community/react-navigation",
    repositoryList: [],
    loading: false,
    error: false,
    refreshing: false
  };

  componentDidMount = async () => {
    // this.limpar();
    await this.loadRepositories();
  };

  loadRepositories = async () => {
    this.setState({ refreshing: true });
    const repos = await AsyncStorage.getItem("@GithubRepo:repositoryList");
    if (repos) {
      const repositoryList = JSON.parse(repos);
      this.setState({ repositoryList });
    }
    this.setState({ refreshing: false });
  };

  limpar = async () => {
    await AsyncStorage.removeItem("@GithubRepo:repositoryList");
    this.loadRepositories();
  };

  checkUserExists = async repository => {
    const { data } = await api.get(`/repos/${repository}`);
    return data;
  };

  saveRepository = async ({ id, name, full_name, organization }) => {
    const { avatar_url, login } = organization;
    const { repositoryList } = this.state;
    const itemRepo = { id, name, login, avatar_url, full_name };
    const newRepo = [...repositoryList, itemRepo];
    await AsyncStorage.setItem(
      "@GithubRepo:repositoryList",
      JSON.stringify(newRepo)
    );
    this.setState({ repository: "" });
  };

  addRepository = async () => {
    const { repository } = this.state;
    try {
      this.setState({ loading: true, error: false });
      const repo = await this.checkUserExists(repository);
      await this.saveRepository(repo);
    } catch (error) {
      console.tron.log("Erro ao buscar repositório", error);
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleNextPage = full_name => {
    const { navigation } = this.props;
    navigation.navigate("Issues", {
      full_name: full_name,
      other: "0/0"
    });
  };

  render() {
    const {
      repository,
      repositoryList,
      loading,
      error,
      refreshing
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Header title="GitIssues" />
        {error && <Text style={styles.error}>Erro ao adicionar</Text>}
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
            {loading ? (
              <ActivityIndicator
                size="small"
                style={styles.activityIndicator}
              />
            ) : (
              <Icon name="plus" size={16} style={styles.icon} />
            )}
          </TouchableOpacity>
        </View>
        <Lista
          list={repositoryList}
          handleNextPage={this.handleNextPage}
          refreshRepositories={this.loadRepositories}
          refreshing={refreshing}
        />
      </View>
    );
  }
}
