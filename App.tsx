import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as Location from "expo-location";

// 화면 너비 가져오기
const { width: SCREEN_WIDTH } = Dimensions.get("window");
// 날씨 API 키
const API_KEY = "f1c2920e540a3e7f26ed2b6cfcea65b3";
// 날씨 아이콘 매칭
const weatherIcons = {
  Clear: "sunny",
  Clouds: "cloudy",
  Rain: "rainy",
  Snow: "snowy",
  Thunderstorm: "thunderstorm",
};

export default function App() {
  const [location, setLocation] =
    useState<Location.LocationGeocodedAddress | null>(null);
  const [day, setDay] = useState<any>(null);
  const [isAllow, setIsAllow] = useState<boolean>(false);

  const getWeather = async () => {
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

    // 날씨 데이터 가져오기
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`,
    );

    const data = await response.json();
    setDay(data);
  };

  useEffect(() => {
    getWeather();
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
          {day ? (
            <>
              <Text style={styles.dayTemperature}>{day?.main?.temp}°C</Text>
              <Text style={styles.dayWeather}>
                {day?.weather[0]?.description}
              </Text>
              <Text style={styles.dayMain}>{day?.weather[0]?.main}</Text>
              <Ionicons
                name={
                  (weatherIcons[
                    day?.weather[0]?.main as keyof typeof weatherIcons
                  ] as any) || "cloudy"
                }
                size={64}
                color="white"
              />
            </>
          ) : (
            <ActivityIndicator size="large" color="black" />
          )}
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
    padding: 20,
    // alignItems: "center",
  },
  dayTemperature: {
    marginTop: 50,
    fontSize: 84,
    fontWeight: "bold",
    color: "white",
  },
  dayWeather: {
    marginTop: -10,
    fontSize: 48,
    color: "white",
  },
  dayMain: {
    marginTop: 10,
    fontSize: 24,
    color: "white",
  },
});
