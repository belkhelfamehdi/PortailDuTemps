import { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View } from 'react-native';

export default function Detail() {
  const [hide, setHide] = useState(false);

  return (
    <>
      <Image
        source={require('@/assets/images/trulin.png')}
        style={{ width: '100%', height: 400 }}
      />

      {!hide && (
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: 'lightgray',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: '40%',
            top: '60%',
          }}
        >
          <TouchableOpacity onPress={() => setHide(true)}>
            <Text style={{ color: 'black' }}>Portail Trulin</Text>
          </TouchableOpacity>
        </View>
      )}

    {hide && (
      <View
        style={{
          width: '100%',
          height: '40%',
          backgroundColor: 'lightgray',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
        }}
      >
        <View
          style={{
            width: '90%',
            margin: 20,
          }}
        >
          <View
            style={{
              width: '90%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text>Portail Trulin</Text>
            <TouchableOpacity onPress={() => setHide(!hide)}>
              <Text style={{ color: 'red' }}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '100%', maxHeight: 150, overflow: 'hidden' }}>
            <Text style={{ color: 'black' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </View>
        </View>
      </View>
    )}
    </>
  );
}
