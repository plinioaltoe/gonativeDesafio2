import React, { Component } from "react";

import { View, Text, StatusBar, TouchableOpacity, Linking } from "react-native";
import styles from "./styles";

import Lista from "~/components/Lista";
import Header from "~/components/Header";
import api from "~/services/api";

export default class Issues extends Component {
  state = {
    issueList: [],
    headerTitle: "",
    buttonSelected: "all",
    refreshing: false
  };

  componentDidMount = () => {
    this.setStateIssueList();
    this.getHeaderTitle();
  };

  getHeaderTitle = async () => {
    const full_name = await this.props.navigation.getParam("full_name");
    const headerTitle = full_name.split("/")[0];
    this.setState({ headerTitle });
  };

  setStateIssueList = async (state = "all") => {
    const full_name = await this.props.navigation.getParam("full_name");
    const data = await this.getIssueList(full_name, state);
    const newIssueList = [];
    data.map(issue => {
      const { title, url, user, id } = issue;
      const { avatar_url, login } = user;
      const newIssueItem = {
        id,
        name: title,
        full_name: url,
        avatar_url,
        login
      };
      newIssueList.push(newIssueItem);
    });
    this.setState({ issueList: newIssueList });
  };

  getIssueList = async (repo, state) => {
    const { data } = await api.get(`/repos/${repo}/issues?state=${state}`);
    this.setState({ buttonSelected: state });
    return data;
  };

  redirectPage = url => {
    console.tron.log(url);
    Linking.openURL(url);
  };

  refreshList = () => {
    this.setState({ refreshing: true });
    this.setStateIssueList(this.state.buttonSelected);
    this.setState({ refreshing: false });
  };

  render() {
    const { issueList, headerTitle, buttonSelected, refreshing } = this.state;
    const navigateLocation = "Repositories";
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Header title={headerTitle} navigateLocation={navigateLocation} />
        <View style={styles.bar}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setStateIssueList("all")}
          >
            <Text
              style={
                buttonSelected === "all"
                  ? styles.textButtonSelected
                  : styles.textButton
              }
            >
              Todas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setStateIssueList("open")}
          >
            <Text
              style={
                buttonSelected === "open"
                  ? styles.textButtonSelected
                  : styles.textButton
              }
            >
              Abertas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setStateIssueList("closed")}
          >
            <Text
              style={
                buttonSelected === "closed"
                  ? styles.textButtonSelected
                  : styles.textButton
              }
            >
              Fechadas
            </Text>
          </TouchableOpacity>
        </View>
        <Lista
          list={issueList}
          handleNextPage={this.redirectPage}
          refreshRepositories={this.refreshList}
          refreshing={refreshing}
        />
      </View>
    );
  }
}
