import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function App() {
  const [text, onChangeText] = useState("");
  const [number, onChangeNumber] = useState("");
  const wordCount = useSharedValue(0);
  const numCount = useSharedValue(0);

  const animateUselessText = useAnimatedStyle(() => {
    let degree;
    switch (true) {
      case wordCount.value > 13:
        degree = 90;
        break;
      case wordCount.value > 12:
        degree = 45;
        break;
      case wordCount.value > 8:
        degree = 25;
        break;
      case wordCount.value > 5:
        degree = 15;
        break;
      default:
        degree = 0;
        break;
    }

    return {
      transform: [
        {
          rotateZ:
            degree === 90
              ? withSpring(`-${degree}deg`, {
                  mass: 2,
                  damping: 5,
                  stiffness: 100,
                  overshootClamping: false,
                  restDisplacementThreshold: 0.01,
                  restSpeedThreshold: 2,
                })
              : withSpring(`-${degree}deg`, {
                  mass: 2,
                  damping: 15,
                  stiffness: 100,
                  overshootClamping: false,
                  restDisplacementThreshold: 0.01,
                  restSpeedThreshold: 2,
                }),
        },
      ],
    };
  });

  const animateUselessNumber = useAnimatedStyle(() => {
    let degree = 0;
    switch (true) {
      case numCount.value > 3:
        degree = 25;
        break;
      default:
        degree = 0;
        break;
    }

    return {
      transform: [
        {
          rotateZ: withSpring(`${degree}deg`, {
            mass: 2,
            damping: 15,
            stiffness: 100,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 2,
          }),
        },
      ],
    };
  });

  const animateFallNumber = useAnimatedStyle(() => {
    let fall = 0;
    switch (true) {
      case numCount.value > 6:
        fall = 1800;
        break;
      case numCount.value > 5:
        fall = 35;
        break;
      case numCount.value > 3:
        fall = 25;
        break;
      default:
        fall = 0;
        break;
    }

    return {
      transform: [
        {
          translateY: withSpring(fall, {
            damping: 5,
          }),
        },
      ],
    };
  });

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <Animated.View
        style={[
          {
            transformOrigin: "right center",
          },
          animateUselessText,
        ]}
      >
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            onChangeText(text);
            wordCount.value = text.length;
          }}
          placeholder="useless placeholder"
          value={text}
        />
      </Animated.View>
      <Animated.View style={[animateFallNumber]}>
        <AnimatedTextInput
          style={[
            {
              transformOrigin: "left center",
              paddingLeft: "auto",
              paddingRight: 0,
            },
            styles.input,
            animateUselessNumber,
          ]}
          onChangeText={(number) => {
            onChangeNumber(number);
            numCount.value = number.length;
          }}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric" 
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
