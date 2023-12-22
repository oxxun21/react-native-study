import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    // <View style={styles.container}>
    <View
      // 이렇게도 가능
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={styles.text}>Hello</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// StyleSheet.create 없어도 작동은 하지만 속성 자동완성이 안됨
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  text: {
    fontSize: 28,
  },
});
