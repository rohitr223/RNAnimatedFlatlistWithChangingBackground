import React, { useRef } from "react";
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { DATA } from "./data";

const App = () => {
  // get the window dimensions
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  // adjusting the screen height & width according to our requirements
  const screenWidth = width * 0.7;
  const screenHeight = height * 0.5;

  // inititlize scroll animation value
  const scrollX = useRef(new Animated.Value(0)).current;

  // background image height
  const backDrop = height * 0.5;

  // Function for loading background image
  const BackDropImage = ({ scrollX }) => {
    return (
      <View
        style={
          ([
            {
              height: backDrop,
              width,
              position: "absolute",
              top: 0,
            },
          ],
          StyleSheet.absoluteFillObject)
        }
      >
        {DATA.map((item, index) => {
          //console.log(index);
          const inputRange = [
            (index - 1) * screenWidth,
            index * screenWidth,
            (index + 1) * screenWidth,
          ];

          const outputRange = [0, 1, 0];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange,
          });
          return (
            <Animated.Image
              source={{ uri: item.image }}
              key={index}
              style={{
                height: backDrop,
                width: "100%",
                position: "absolute",
                top: 0,
                opacity,
              }}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar color="#fff" />
      <BackDropImage scrollX={scrollX} />
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        decelerationRate={0}
        snapToInterval={screenWidth}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          // using animation for Flatlist
          const inputRange = [
            (index - 1) * screenWidth,
            index * screenWidth,
            (index + 1) * screenWidth,
          ];

          const outputRange = [0, -50, 0];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange,
          });

          return (
            <Animated.View
              style={[
                styles.cardContainer,
                {
                  backgroundColor: item.color,
                  width: screenWidth,
                  height: screenHeight,
                  transform: [{ translateY }],
                },
              ]}
            >
              <Image source={{ uri: item.image }} style={styles.bgImg} />
            </Animated.View>
          );
        }}
        contentContainerStyle={styles.flatList}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#252525",
  },
  flatList: {
    paddingTop: "70%",
    alignItems: "center",
  },
  cardContainer: {
    borderWidth: 10,
    borderColor: "#EFEFEF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: 10,
  },
  bgImg: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
});
