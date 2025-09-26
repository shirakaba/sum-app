import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button } from "react-native";
import { useEffect, useState } from "react";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Button
        title="Try NativeScript"
        onPress={() => {
          const block = () => {
            const alertController =
              UIAlertController.alertControllerWithTitleMessagePreferredStyle(
                "Hype alert",
                "We just accessed an arbitrary UIKit API on the UI thread from JS! 🥳",
                UIAlertControllerStyle.Alert
              );
            alertController.addAction(
              UIAlertAction.actionWithTitleStyleHandler(
                "Sweet",
                UIAlertActionStyle.Default,
                () => {}
              )
            );
            const rootViewController =
              UIApplication.sharedApplication.keyWindow.rootViewController;

            // We're confident we're on the JS thread, not the UI thread here.
            rootViewController.presentViewControllerAnimatedCompletion(
              alertController,
              true,
              () => {}
            );
          };

          // The semantics of this is "run this block on the main thread".
          // However, the NativeScript implementation isn't matching
          // expectations here.
          NSOperationQueue.mainQueue.addOperationWithBlock(block);

          // dispatch_async(dispatch_get_main_queue(), block);
        }}
      />
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
