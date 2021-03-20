import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { View as MotiView } from "moti";

const MotiAnimations = () => {
  const [pressed, onPressed] = React.useState(false);

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, type: "timing", duration: 2000 }}
        >
          <Text>Animated text !!!</Text>
        </MotiView>
        <MotiView
          style={styles.box}
          from={{
            // translateY: -20,
            rotate: "0deg",
          }}
          animate={{
            // translateY: 200,
            rotate: "90deg",
          }}
          transition={{
            type: "timing",
            duration: 2000,
            loop: true,
            // repeat: 4,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 40 }}>
            TG
          </Text>
        </MotiView>

        <Pressable
          onPress={() => {
            onPressed(!pressed);
          }}
        >
          <MotiView
            style={[styles.box, { backgroundColor: "#f44336" }]}
            animate={{
              translateY: pressed ? 100 : 0,
            }}
          >
            <MotiView
              animate={{
                opacity: [0, 1],
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
                {pressed ? "UP" : "DOWN"}
              </Text>
            </MotiView>
          </MotiView>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: "#1deded",
    borderRadius: 12,
    marginVertical: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MotiAnimations;
