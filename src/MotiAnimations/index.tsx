import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { View as MotiView, useAnimationState } from "moti";

// you can create a reusable animation preset
const useFadeInDown = () => {
  return useAnimationState({
    from: {
      opacity: 0,
      translateY: -15,
    },
    to: {
      opacity: 1,
      translateY: 0,
    },
  });
};

const MotiAnimations = () => {
  const fadeInDown = useFadeInDown();

  const scaleIn = useAnimationState({
    from: {
      scale: 0.5,
    },
    open: {
      scale: 1,
    },
    big: {
      scale: 1.5,
    },
  });

  const onPress = () => {
    fadeInDown.transitionTo((state) => {
      if (state === "from") {
        return "to";
      } else {
        return "from";
      }
    });

    if (scaleIn.current === "from") {
      scaleIn.transitionTo("open");
    } else if (scaleIn.current === "open") {
      scaleIn.transitionTo("big");
    } else {
      scaleIn.transitionTo("from");
    }
  };

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

        <Pressable onPress={onPress}>
          <MotiView
            delay={300}
            state={fadeInDown}
            style={[styles.box, { backgroundColor: "#f44336" }]}
          />
          <MotiView
            transition={{
              type: "spring",
            }}
            delay={300}
            state={scaleIn}
            style={[styles.box, { backgroundColor: "#ededed" }]}
          />
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
