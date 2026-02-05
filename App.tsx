import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";

// 화면 너비 가져오기
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.day}>
          <Text style={styles.dayTemperature}>10°C</Text>
          <Text style={styles.dayWeather}>Clear</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.dayTemperature}>10°C</Text>
          <Text style={styles.dayWeather}>Clear</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.dayTemperature}>10°C</Text>
          <Text style={styles.dayWeather}>Clear</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.dayTemperature}>10°C</Text>
          <Text style={styles.dayWeather}>Clear</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.dayTemperature}>10°C</Text>
          <Text style={styles.dayWeather}>Clear</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.dayTemperature}>10°C</Text>
          <Text style={styles.dayWeather}>Clear</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 48,
    fontWeight: "bold",
  },
  weather: {
    // flex: 3,
    // justifyContent: "center",
    // backgroundColor: "teal",
  },
  day: {
    // flex: 1,
    width: SCREEN_WIDTH,

    alignItems: "center",
  },
  dayTemperature: {
    marginTop: 50,
    fontSize: 96,
    fontWeight: "bold",
    color: "white",
  },
  dayWeather: {
    marginTop: -10,
    fontSize: 48,
    color: "white",
  },
});
