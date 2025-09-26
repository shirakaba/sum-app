import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Button
        title="Try NativeScript in React Native"
        onPress={() => {
          console.log(`[JS onPress] isMainThread: ${NSThread.isMainThread}`);

          // Cross over to the UI thread to show a native alert.
          NSOperationQueue.mainQueue.addOperationWithBlock(() => {
            console.log(
              `[native operation] isMainThread: ${NSThread.isMainThread}`
            );

            // Initialise the native alert...
            const alertController =
              UIAlertController.alertControllerWithTitleMessagePreferredStyle(
                "Hype alert",
                "We just accessed an arbitrary UIKit API on the UI thread from JS! 🥳",
                UIAlertControllerStyle.Alert
              );
            alertController.addAction(
              UIAlertAction.actionWithTitleStyleHandler(
                "Okay",
                UIAlertActionStyle.Default,
                () => {}
              )
            );

            // ... And show it!
            const { rootViewController } =
              UIApplication.sharedApplication.keyWindow;
            rootViewController.presentViewControllerAnimatedCompletion(
              alertController,
              true,
              () => {
                // On completion, we're still on the UI thread:
                console.log(
                  `[native completion] isMainThread: ${NSThread.isMainThread}`
                );
                // ... But can get back to the JS thread if needed!
                setTimeout(() => {
                  console.log(
                    `[JS timeout] isMainThread: ${NSThread.isMainThread}`
                  );
                }, 0);
              }
            );
          });
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
