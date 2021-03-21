import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import "react-native-reanimated";
// import AnimationsComponent from "./src/AnimatedAccordion/animation";
// import AnimatedCarousel from "./src/AnimatedCarousel/carousel";
// import MotiAnimations from "./src/MotiAnimations";
import MotiCarousel from "./src/MotiCarousel";

const ShadowPropSlider = (props: any) => {
  const { label, value } = props;

  return (
    <>
      <Text>
        {label} ({value.toFixed(2)})
      </Text>
      <Slider step={1} value={value} {...props} />
    </>
  );
};

const App1 = () => {
  const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0);
  const [shadowOffsetHeight, setShadowOffsetHeight] = useState(-10.0);
  const [shadowRadius, setShadowRadius] = useState(10.0);
  const [shadowOpacity, setShadowOpacity] = useState(0.6);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.square,
          {
            shadowOffset: {
              width: shadowOffsetWidth,
              height: -shadowOffsetHeight,
            },
            shadowOpacity,
            shadowRadius,
            backgroundColor: "orange",
            shadowColor: "orange",
            elevation: 6,
          },
        ]}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Button
        </Text>
      </View>
      <View style={styles.controls}>
        <ShadowPropSlider
          label="shadowOffset - X"
          minimumValue={-50}
          maximumValue={50}
          value={shadowOffsetWidth}
          onValueChange={(val: number) => setShadowOffsetWidth(val)}
        />
        <ShadowPropSlider
          label="shadowOffset - Y"
          minimumValue={-50}
          maximumValue={50}
          value={shadowOffsetHeight}
          onValueChange={(val: number) => setShadowOffsetHeight(val)}
        />
        <ShadowPropSlider
          label="shadowRadius"
          minimumValue={0}
          maximumValue={100}
          value={shadowRadius}
          onValueChange={(val: number) => setShadowRadius(val)}
        />
        <ShadowPropSlider
          label="shadowOpacity"
          minimumValue={0}
          maximumValue={1}
          step={0.05}
          value={shadowOpacity}
          onValueChange={(val: number) => setShadowOpacity(val)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  square: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 24,
    width: "60%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  controls: {
    paddingHorizontal: 12,
  },
});

const App = () => {
  // return <AnimationsComponent />
  // return <AnimatedCarousel/>
  // return <MotiAnimations />;
  return <MotiCarousel />
};

export default App;
