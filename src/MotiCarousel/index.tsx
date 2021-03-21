import * as React from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  StatusBar,
  Image,
  View,
  StyleSheet,
} from "react-native";
import { View as MotiView, Image as MotiImage } from "moti";

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

const MotiCarousel = () => {
  const [currentIndx, setCurrentIndx] = React.useState<number>(0);

  const viewConfigRef = React.useRef({
    viewAreaCoveragePercentThreshold: 80, // percentage
    minimumViewTime: 1,
  });

  const onViewRef = React.useRef((data: any) => {
    setCurrentIndx(data.changed[0].index);
  });

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        <StatusBar hidden />
        <View style={StyleSheet.absoluteFillObject}>
          {data.map((item, index) => {
            return (
              <MotiImage
                animate={{
                  opacity: index === currentIndx ? 1 : 0,
                }}
                transition={{
                  type: "timing",
                  duration: 300,
                }}
                key={`image=${index}`}
                source={{ uri: item }}
                style={[StyleSheet.absoluteFillObject]}
                blurRadius={Platform.select({ ios: 50, android: 20 })}
              />
            );
          })}
        </View>
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          renderItem={({ item, index }) => {
            return (
              <MotiView
                animate={{
                  ...Platform.select({
                    ios: {
                      shadowOpacity: index === currentIndx ? 0.5 : 0,
                    },
                  }),
                }}
                transition={{ type: "timing", duration: 800 }}
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
                <MotiView
                  transition={{ type: "timing", duration: 800 }}
                  style={{
                    width: imageWidth,
                    height: imageHeight,
                    ...Platform.select({
                      android: {
                        elevation: index === currentIndx ? 10 : 0,
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
                </MotiView>
              </MotiView>
            );
          }}
        />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.map((_, i) => {
            return (
              <MotiView
                key={`indicator-${i}`}
                animate={{
                  opacity: i === currentIndx ? 0.9 : 0.4,
                  backgroundColor: i === currentIndx ? "#1deded" : "#ededed",
                  scale: i === currentIndx ? 1 : 0.5,
                  width: i === currentIndx ? 20 : 10,
                }}
                transition={{ type: "timing", duration: 300 }}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 4,
                }}
              />
            );
          })}
        </View>
      </View>
    </>
  );
};

export default MotiCarousel;
