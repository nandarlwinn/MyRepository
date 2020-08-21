/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Alert, TouchableOpacity, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    };
  }
  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    });
  };
  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.tileO} />;
      default:
        return <View />;
    }
  };
  onTilePress = (row, col) => {
    //Dont allow tiles to change...
    var value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }
    //Grab current player...
    var currentPlayer = this.state.currentPlayer;
    //set the correct tile...
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});
    //switch to other player...
    var nextPayer = currentPlayer === 1 ? -1 : 1;
    this.setState({currentPlayer: nextPayer});

    //check for winner...
    var winner = this.getWinner();
    if (winner === 1) {
      Alert.alert('Player1 is the winner!');
    }

    if (winner === -1) {
      Alert.alert('Player2 is the winner!');
    }
  };
  //return 1 if player 1 won,-1 if player 2 won,0 if no one has won..
  getWinner = () => {
    const NUM_TILES = 3;
    var array = this.state.gameState;
    var sum = 0;
    //check rows...
    for (let index = 0; index < NUM_TILES; index++) {
      sum = array[index][0] + array[index][1] + array[index][2];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }
    //check columns...
    for (let index = 0; index < NUM_TILES; index++) {
      sum = array[0][index] + array[1][index] + array[2][index];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }
    //check the diagonals...
    sum = array[0][0] + array[1][1] + array[2][2];
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }
    sum = array[2][0] + array[1][1] + array[0][2];
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }
    //there are no winer...
    return 0;
  };
  onNewGamePress = () => {
    this.initializeGame();
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 0)}
            style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0}]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 1)}
            style={[styles.tile, {borderTopWidth: 0}]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 2)}
            style={[styles.tile, {borderRightWidth: 0, borderTopWidth: 0}]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 0)}
            style={[styles.tile, {borderLeftWidth: 0}]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 1)}
            style={styles.tile}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 2)}
            style={[styles.tile, {borderRightWidth: 0}]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 0)}
            style={[styles.tile, {borderLeftWidth: 0, borderBottomWidth: 0}]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 1)}
            style={[styles.tile, {borderBottomWidth: 0}]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 2)}
            style={[styles.tile, {borderRightWidth: 0, borderBottomWidth: 0}]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        <View style={{paddingTop: 50}}>
          <Button title="New Game" onPress={this.onNewGamePress} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 3,
    width: 100,
    height: 100,
  },
  tileX: {
    color: 'red',
    fontSize: 68,
  },
  tileO: {
    color: 'green',
    fontSize: 68,
  },
});
