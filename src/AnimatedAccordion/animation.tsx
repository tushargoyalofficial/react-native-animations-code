import * as React from "react";
import { StatusBar, TouchableOpacity, View, Text } from "react-native";
import {} from "react-native-gesture-handler";
import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";
import data from "./data";

const transition = (
  <Transition.Together>
    <Transition.In type={"fade"} durationMs={200} />
    <Transition.Change />
    <Transition.Out type={"fade"} durationMs={200} />
  </Transition.Together>
);

const AnimationsComponent = () => {
  const [currentIndex, setCurrentIndex] = React.useState<number | null>(null);
  const ref: React.RefObject<TransitioningView> = React.useRef() as React.RefObject<TransitioningView>;

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center" }}
    >
      <StatusBar hidden />
      {data.map(({ bg, color, category, subCategories }, index: number) => {
        return (
          <TouchableOpacity
            key={category}
            onPress={() => {
              ref?.current?.animateNextTransition();
              setCurrentIndex(index === currentIndex ? null : index);
            }}
            style={{ flexGrow: 1 }}
            activeOpacity={0.9}
          >
            <View
              style={{
                backgroundColor: bg,
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color,
                  fontSize: 38,
                  fontWeight: "900",
                  letterSpacing: -2,
                  textTransform: "uppercase",
                }}
              >
                {category}
              </Text>
              {index === currentIndex && (
                <View style={{ marginTop: 20 }}>
                  {subCategories.map((subCat) => (
                    <Text
                      key={subCat}
                      style={{
                        color,
                        fontSize: 20,
                        lineHeight: 20 * 1.5,
                        textAlign: "center",
                      }}
                    >
                      {subCat}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </Transitioning.View>
  );
};

export default AnimationsComponent;
