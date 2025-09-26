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
            console.log("block now running...");

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
              () => {
                console.log("Completion.");
                console.log(`NSThread.isMainThread: ${NSThread.isMainThread}`);
                console.log(
                  `NSThread.currentThread.name: ${NSThread.currentThread.name}`
                );

                setTimeout(() => {
                  console.log("timeout!");
                }, 1000);
              }
            );
          };

          console.log(`NSThread.isMainThread: ${NSThread.isMainThread}`);
          console.log(
            `NSThread.currentThread.name: ${NSThread.currentThread.name}`
          );

          // The semantics of this is "run this block on the main thread".
          // However, the NativeScript implementation isn't matching
          // expectations here.
          console.log("before");

          // addOperationWithBlock() is a non-blocking method, so we see the
          // "after" log before we get the UIKit crash.
          NSOperationQueue.mainQueue.addOperationWithBlock(block);

          console.log("after");

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
