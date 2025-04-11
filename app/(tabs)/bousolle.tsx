// CompassSwitcher.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CompassSvg from '../../assets/images/bousolle.svg';

const CompassSwitcher = () => {
  const [isGoodDirection, setIsGoodDirection] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGoodDirection(prev => !prev);
    }, 5000); // switch toutes les 5 secondes

    return () => clearInterval(interval);
  }, []);

  const backgroundColor = isGoodDirection ? '#4CAF50' : '#F44336';
  const message = isGoodDirection
    ? 'Vous êtes dans la bonne direction'
    : 'Mauvaise direction';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <CompassSvg width={150} height={150} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default CompassSwitcher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  }
});
