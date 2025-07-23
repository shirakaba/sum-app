import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button } from "react-native";
import { useEffect, useState } from "react";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Button title="Try NativeScript" onPress={() => {
        const hello = NSString.alloc().initWithString("Hello");
        const helloWorld = hello.stringByAppendingString(', world!');
        console.log(helloWorld);
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});