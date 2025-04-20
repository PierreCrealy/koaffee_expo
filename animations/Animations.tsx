import { Animated } from 'react-native';
import {useRef} from "react";

export const fadeIn = (duration = 500) => {
    const opacity = new Animated.Value(0);
    const animation = Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
    });
    return { opacity, animation };
};

export const slideInFromBottom = (duration = 500, distance = 50) => {
    const translateY = new Animated.Value(distance);
    const animation = Animated.timing(translateY, {
        toValue: 0,
        duration,
        useNativeDriver: true,
    });
    return { translateY, animation };
};

export const slideInFromLeft = (duration = 500, distance = 100) => {
    const translateX = useRef(new Animated.Value(-distance)).current;
    const animation = Animated.timing(translateX, {
        toValue: 0,
        duration,
        useNativeDriver: true,
    });
    return { translateX, animation };
};
