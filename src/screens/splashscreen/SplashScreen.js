import React, { useEffect } from "react";
import { View } from "react-native";
import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

useEffect(() => {
  setTimeout(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'loginSelection' }], // must match Stack.Screen name exactly
    });
  }, 2000);
}, [navigation]);

  // Define custom zoom animation
  const pulse = {
    0: { transform: [{ scale: 1 }] },
    0.5: { transform: [{ scale: 1.1 }] },
    1: { transform: [{ scale: 1 }] },
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: '#fff',
      }}
    >
      <Animatable.Image
        animation={pulse}
        duration={1500}
        iterationCount="infinite"
        source={require('../../../assets/logo.png')}
        style={{ width: 150, height: 200 }}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;
