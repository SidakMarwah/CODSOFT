// App.js 
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Platform, Clipboard } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";

const App = () => {
  const [quote, setQuote] = useState("");
  useEffect(() => {
    fetchQuoteFunction();
  }, []);
  const fetchQuoteFunction = async () => {
    try {
      const res = await axios.get("https://type.fit/api/quotes");
      const quo = res.data;
      const idx = Math.floor(Math.random() * quo.length);
      const randomQuo = quo[idx].text;
      await AsyncStorage.setItem("lastQuote", randomQuo);
      setQuote(randomQuo);
    } catch (error) {
      console.error("Error fetching quotes:", error.message);
    }
  };
  const newQuoteFunction = () => {
    fetchQuoteFunction();
  };
  const cpyFunction = () => {
    try {
      Clipboard.setString(quote);
      alert("Quote copied to clipboard!");
    } catch (error) {
      console.error("Error copying to clipboard:", error.message);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.codsoftText}>CodSoft</Text>
        <Text style={styles.header2}>
          Random Quote Generator using React-Native
        </Text>
        <View style={styles.card}>
          <Icon
            name="quote-left"
            size={30}
            color="#3498db"
            style={styles.quoteIcon}
          />
          <Text style={styles.quoteText}>{quote}</Text>
          <View style={styles.cardButtons}>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={cpyFunction}
            >
              <Text style={styles.copyButtonText}>
                Copy to Clipboard
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.newQuoteButton}
              onPress={newQuoteFunction}
            >
              <Text style={styles.buttonText}>New Quote</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default App; 
