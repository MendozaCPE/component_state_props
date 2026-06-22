import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CounterButtonProps {
  title: string;
  color: string;
  onPress: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  isCircular?: boolean;
}

export default function CounterButton({
  title,
  color,
  onPress,
  onPressIn,
  onPressOut,
  isCircular
}: CounterButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color, shadowColor: color },
        isCircular ? styles.circularButton : styles.rectButton
      ]}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, isCircular && styles.circularText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  rectButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    marginVertical: 8,
  },
  circularButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  circularText: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '300',
  }
});
