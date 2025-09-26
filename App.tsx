import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button } from "react-native";

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

            rootViewController.presentViewControllerAnimatedCompletion(
              alertController,
              true,
              () => {
                console.log("Completion.");
                console.log(`NSThread.isMainThread: ${NSThread.isMainThread}`);
                console.log(
                  `NSThread.currentThread.name: "${NSThread.currentThread.name}"`
                );

                setTimeout(() => {
                  console.log(
                    `timeout 1! NSThread.currentThread.name: "${NSThread.currentThread.name}"`
                  );

                  NSOperationQueue.mainQueue.addOperationWithBlock(() => {
                    const alertController =
                      UIAlertController.alertControllerWithTitleMessagePreferredStyle(
                        "Hype alert 2",
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
                      UIApplication.sharedApplication.keyWindow
                        .rootViewController;

                    rootViewController.presentViewControllerAnimatedCompletion(
                      alertController,
                      true,
                      () => {
                        console.log("Completion.");
                        console.log(
                          `NSThread.isMainThread: ${NSThread.isMainThread}`
                        );
                        console.log(
                          `NSThread.currentThread.name: ${NSThread.currentThread.name}`
                        );

                        setTimeout(() => {
                          console.log(
                            `timeout 2! NSThread.currentThread.name: "${NSThread.currentThread.name}"`
                          );
                        }, 1000);
                      }
                    );
                  });
                }, 5000);
              }
            );
          };

          console.log(`NSThread.isMainThread: ${NSThread.isMainThread}`);
          console.log(
            `NSThread.currentThread.name: ${NSThread.currentThread.name}`
          );

          console.log("before");

          // addOperationWithBlock() is a non-blocking method, so we see the
          // "after" log before the "block now running..." log.
          NSOperationQueue.mainQueue.addOperationWithBlock(block);

          console.log("after");
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
