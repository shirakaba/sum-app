import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Button
        title="Try NativeScript"
        onPress={() => {
          console.log(`[JS onPress] isMainThread: ${NSThread.isMainThread}`);

          // Cross over to the UI thread to show a UIAlert
          NSOperationQueue.mainQueue.addOperationWithBlock(() => {
            console.log(
              `[native operation] isMainThread: ${NSThread.isMainThread}`
            );

            // Build the UIAlert
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

            // Show the UIAlert
            const { rootViewController } =
              UIApplication.sharedApplication.keyWindow;
            rootViewController.presentViewControllerAnimatedCompletion(
              alertController,
              true,
              () => {
                console.log(
                  `[native completion] isMainThread: ${NSThread.isMainThread}`
                );
                setTimeout(() => {
                  console.log(
                    `[JS timeout] isMainThread: ${NSThread.isMainThread}`
                  );
                }, 1000);
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
