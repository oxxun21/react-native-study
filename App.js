import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "a6b736388f27635d259edc2d80c58d4b";

const icons = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [ok, setOk] = useState(true);
  const [days, setDays] = useState([]);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });

    setCity(location[0].city);

    const { list } = await (await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)).json();
    const filteredList = list.filter(({ dt_txt }) => dt_txt.endsWith("00:00:00"));
    setDays(filteredList);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weather}>
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="white" style={{ marginTop: 10 }} size="large" />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.tinyText}>{new Date(day.dt * 1000).toDateString()}</Text>
              <Text style={styles.temp}>{parseFloat(day.main.temp).toFixed(1)}</Text>
              <View style={{ ...styles.day, flexDirection: "row", justifyContent: "space-evenly" }}>
                <Text style={styles.desc}>{day.weather[0].main}</Text>
                <Fontisto name={icons[day.weather[0].main]} size={40} color="black" />
              </View>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6495ED",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: 600,
  },
  weather: {
    // backgroundColor: "#4169E1",
  },
  day: {
    alignItems: "center",
    width: SCREEN_WIDTH,
  },
  temp: {
    fontSize: 178,
    marginTop: 50,
  },
  desc: {
    marginTop: -20,
    fontSize: 60,
  },
  tinyText: {
    fontSize: 20,
  },
});
