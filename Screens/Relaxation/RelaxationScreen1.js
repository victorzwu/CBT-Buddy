import { View, Text, Pressable, StyleSheet, Image, Modal } from "react-native";
import React from "react";
import CountDownTimer from "../../Components/CountDownTimer";
import { useState } from "react";
import { COLORS } from "../../color";

export default function RelaxationScreen1() {
  const [breathingModalVisible, setBreathingModalVisible] = useState(false);
  const [quotesModalVisible, setQuotesModalVisible] = useState(false);

  function breathingPressed() {
    setBreathingModalVisible(!breathingModalVisible);
  }

  function quotesPressed() {
    setQuotesModalVisible(!quotesModalVisible);
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable} onPress={() => breathingPressed()}>
        <Image
          style={styles.breathingIcon}
          source={require("../../assets/icons/breathing.png")}
        />
        <Text style={styles.pressableText}>Deep Breathing</Text>
      </Pressable>

      <Pressable style={styles.pressable} onPress={() => quotesPressed()}>
        <Image
          style={styles.quotesIcon}
          source={require("../../assets/icons/thinking.png")}
        />
        <Text style={styles.pressableText}>Inspirational Quotes</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={false}
        visible={breathingModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.breathingContainer}>
          <View style = {styles.countdownContainer}>
          <CountDownTimer seconds={10} pressedHandler={breathingPressed} />
          </View>
          <View style = {styles.stopContainer}>
            <Pressable style={styles.stop} onPress={() => breathingPressed()}>
              <Text>Stop</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={quotesModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <Pressable style={styles.stop} onPress={() => quotesPressed()}>
            <Text>Stop</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  breathingContainer: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  stopContainer: {
    flex: 1, 
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  countdownContainer:
  {
    flex: 7
  },
  pressable: {
    padding: 20,
    margin: 10,
    borderWidth: 1,
    height: 200,
    width: 200,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  stop: {
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    backgroundColor: "#f9f9f9",
  },
  pressableText: {
    color: COLORS.white,
  },
  breathingIcon: {
    height: 100,
    width: 100,
    margin: 20,
    marginRight: 30,
  },
  quotesIcon: {
    height: 150,
    width: 150,
    margin: 0,
    marginRight: 0,
  },
});
