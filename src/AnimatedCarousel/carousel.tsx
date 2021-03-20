import * as React from "react";
import {
  View,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Animated,
  Platform,
} from "react-native";

const { width } = Dimensions.get("screen");
const imageWidth = width * 0.7;
const imageHeight = imageWidth * 1.54;

const data = [
  "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d",
  "https://images.unsplash.com/photo-1485163819542-13adeb5e0068?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80",
  "https://images.unsplash.com/photo-1463438690606-f6778b8c1d10?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80",
  "https://images.unsplash.com/photo-1506792006437-256b665541e2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80",
  "https://images.unsplash.com/photo-1508898578281-774ac4893c0c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  "https://images.unsplash.com/photo-1513909894411-7d7e04c28ecd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
];

// type transitions = "fade" | "slide" | "none" | null | undefined;
// const STYLES: StatusBarStyle[] = ["default", "dark-content", "light-content"];
// const TRANSITIONS: transitions[] = ["fade", "slide", "none"];

const AnimatedCarousel = () => {
  // const [hidden, setHidden] = React.useState(false);
  // const [statusBarStyle, setStatusBarStyle] = React.useState<
  //   StatusBarStyle | null | undefined
  // >(STYLES[1]);
  // const [statusBarTransition, setStatusBarTransition] = React.useState<
  //   "fade" | "slide" | "none" | null | undefined
  // >(TRANSITIONS[1]);

  const scrollx = React.useRef(new Animated.Value(0)).current;

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        <StatusBar hidden />
        <View style={StyleSheet.absoluteFillObject}>
          {data.map((item, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            let opacity = scrollx.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
            });

            return (
              <Animated.Image
                key={`image=${index}`}
                source={{ uri: item }}
                style={[StyleSheet.absoluteFillObject, { opacity }]}
                blurRadius={Platform.select({ ios: 50, android: 20 })}
              />
            );
          })}
        </View>
        <Animated.FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollx } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width,
                  justifyContent: "center",
                  alignItems: "center",
                  ...Platform.select({
                    ios: {
                      shadowColor: "#000",
                      shadowOpacity: 0.5,
                      shadowOffset: {
                        width: 0,
                        height: 0,
                      },
                      shadowRadius: 20,
                    },
                  }),
                }}
              >
                <View
                  style={{
                    width: imageWidth,
                    height: imageHeight,
                    ...Platform.select({
                      android: {
                        elevation: 10,
                        shadowColor: "#000",
                        overflow: "hidden",
                        borderRadius: 16,
                      },
                    }),
                  }}
                >
                  <Image
                    source={{ uri: item }}
                    resizeMode={"cover"}
                    style={{
                      width: imageWidth,
                      height: imageHeight,
                      resizeMode: "cover",
                      borderRadius: 16,
                    }}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
      {/* <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ededed",
          }}
        >
          <Image
            source={{ uri: "https://picsum.photos/seed/picsum/400/200" }}
            style={{ flex: 1, justifyContent: "center", width: "100%" }}
            resizeMode={"contain"}
          />
          <Text>Animated Carousel</Text>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#bdbdbd",
          }}
        >
          <Text>Another View</Text>
        </View>
      </SafeAreaView>
     */}
    </>
  );
};

export default AnimatedCarousel;
