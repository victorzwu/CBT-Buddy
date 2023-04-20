import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import { COLORS } from "../color";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Quotes() {
  const [quote, setQuote] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function getQuote() {
      const response = await fetch("https://zenquotes.io/api/random");
      const data = await response.json();
      //   console.log(data)
      const author = data[0].a;
      const quote = data[0].q;
      setQuote({ author: author, quote: quote });
    }
    getQuote();
    // console.log(quote)
  }, [refresh]);

  function refreshHandler()
  {
    setRefresh(!refresh);
  }

  return (
    <View style={styles.container}>
      {quote && (
        <View style={styles.textContainer}>
          <Text style={styles.quote}>"{quote.quote}"</Text>
          <View style={styles.authorContainer}>
            <Text style={styles.author}>{quote.author}</Text>
          </View>
        </View>
      )}

      <View style = {styles.refreshContainer}>
        <MaterialCommunityIcons name="refresh-circle" size={60} color="black" onPress={() => refreshHandler()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    width: "70%",
    paddingTop: 200,
  },
  total: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  authorContainer: {
    flexDirection: "row-reverse",
    width: "100%",
    padding: 5,
  },
  quote: {
    fontSize: 30,
  },
  author: {},
  card: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.grey,
    borderWidth: 2,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 8,
    },
    padding: 30,
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 16,
    borderRadius: 15,
  },
  refreshContainer: {
    marginTop: 20
  }
});
