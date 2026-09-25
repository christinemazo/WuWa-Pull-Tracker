import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Welcome back, Rover</Text>
      <Text style={styles.subtitle}>Ready to explore Solaris-3 </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(3, 101, 192)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#fff*",
  },
});
