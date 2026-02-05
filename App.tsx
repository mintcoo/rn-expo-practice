import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";

import * as Location from "expo-location";

// 화면 너비 가져오기
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [location, setLocation] =
    useState<Location.LocationGeocodedAddress | null>(null);
  const [isAllow, setIsAllow] = useState<boolean>(false);

  useEffect(() => {
    async function getCurrentLocation() {
      // 위치 권한 요청
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setIsAllow(false);
        return;
      } else {
        setIsAllow(true);
      }
      // 위치 정보(위도, 경도) 가져오기
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      //
      const reverseLocation = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log(reverseLocation[0].city);
      setLocation(reverseLocation[0]);
    }

    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>
          {location?.city + " " + location?.region || "Loading..."}
        </Text>
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
