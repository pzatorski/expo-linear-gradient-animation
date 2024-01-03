import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

const AnimatedLinearGradient =
  Animated.createAnimatedComponent(LinearGradient);

export default function App() {
  const colorsValue1 = useSharedValue(1);
  const colorsValue2 = useSharedValue(1);
  const colorsValue3 = useSharedValue(1);

  const [androidColors, setAndroidColors] = useState([
    '#7AF5C1',
    '#7FEC90',
    '#EFFB60',
  ]);

  useEffect(() => {
    colorsValue1.value = withRepeat(
      withSequence(
        withTiming(0, {
          duration: 3000,
          easing: Easing.quad,
        }),
        withTiming(2, {
          duration: 2000,
          easing: Easing.quad,
        })
      ),
      -1,
      true
    );

    colorsValue2.value = withRepeat(
      withSequence(
        withTiming(0, {
          duration: 2000,
          easing: Easing.quad,
        }),
        withTiming(2, {
          duration: 3000,
          easing: Easing.quad,
        })
      ),
      -1,
      true
    );

    colorsValue3.value = withRepeat(
      withSequence(
        withTiming(0, {
          duration: 3000,
          easing: Easing.quad,
        }),
        withTiming(2, {
          duration: 2000,
          easing: Easing.quad,
        })
      ),
      -1,
      true
    );
  }, []);

  const animatedProps = useAnimatedProps(() => {
    const colors = [
      interpolateColor(
        colorsValue1.value,
        [0, 1, 2],
        ['#7AF5C1', '#80E987', '#EFFB60']
      ),
      interpolateColor(
        colorsValue2.value,
        [0, 1, 2],
        ['#80E987', '#EFFB60', '#7AF5C1']
      ),
      interpolateColor(
        colorsValue3.value,
        [0, 1, 2],
        ['#EFFB60', '#7AF5C1', '#80E987']
      ),
    ];

    runOnJS(setAndroidColors)(colors);

    return {
      colors,
    };
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.gradientContainer}>
          <AnimatedLinearGradient
            colors={[
              interpolateColor(
                colorsValue1.value,
                [0, 1, 2],
                ['#7AF5C1', '#80E987', '#EFFB60']
              ),
              interpolateColor(
                colorsValue2.value,
                [0, 1, 2],
                ['#80E987', '#EFFB60', '#7AF5C1']
              ),
              interpolateColor(
                colorsValue3.value,
                [0, 1, 2],
                ['#EFFB60', '#7AF5C1', '#80E987']
              ),
            ]}
            // animatedProps={animatedProps}
            start={{ x: 0, y: 0.6 }}
            end={{ x: 1, y: 0 }}
            style={styles.linearGradient}
          >
            <LinearGradient
              style={styles.linearGradient}
              locations={[0.6, 1]}
              colors={[
                'rgba(255, 255, 255, 0)',
                'rgba(255, 255, 255, 1)',
              ]}
            />
          </AnimatedLinearGradient>
        </View>

        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to</Text>
            <Text style={styles.title}>new era of</Text>
            <Text style={styles.title}>banking</Text>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  gradientContainer: {
    flex: 2,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 20,
  },
  footerContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingVertical: 28,
  },
  title: {
    fontSize: 40,
    fontWeight: '400',
    lineHeight: 42,
  },
  buttonsContainer: {
    flexDirection: 'column',
    rowGap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#000',
    borderColor: '#000',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});
