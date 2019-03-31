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
import Header from "~/components/Header";
import api from "~/services/api";

export default class Issues extends Component {
  state = {
    issue: "react-community/react-navigation",
    issueList: []
  };

  componentDidMount = () => {
    this.refreshList();
  };

  refreshList = async () => {
    const repos = await AsyncStorage.getItem("@GithubRepo:issueList");
    if (repos) {
      const issueList = JSON.parse(repos);
      this.setState({ issueList });
    }
  };

  checkUserExists = async issue => {
    const { data } = await api.get(`/repos/${issue}`);
    return data;
  };

  saveIssue = async ({ id, name, organization }) => {
    const { avatar_url, login } = organization;
    const { issueList } = this.state;
    const itemRepo = { id, name, login, avatar_url };
    const newRepo = [...issueList, itemRepo];
    await AsyncStorage.setItem(
      "@GithubRepo:issueList",
      JSON.stringify(newRepo)
    );
    this.setState({ issue: "" });
  };

  addIssue = async () => {
    const { issue } = this.state;

    try {
      const repo = await this.checkUserExists(issue);
      await this.saveIssue(repo);
    } catch (error) {
      console.tron.log("Erro ao buscar repositório", error);
    }
  };

  handleNextPage = id => {
    const { navigation } = this.props;
    navigation.navigate("Issues");
  };

  render() {
    const { issue, issueList } = this.state;
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
            value={issue}
            onChangeText={text => {
              this.setState({ issue: text });
            }}
          />
          <TouchableOpacity style={styles.button} onPress={this.addIssue}>
            <Icon name="plus" size={16} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Lista list={issueList} handleNextPage={this.handleNextPage} />
      </View>
    );
  }
}
