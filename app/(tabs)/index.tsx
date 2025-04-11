import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const POI = [
  { id: '1', title: 'Beffroi d\'Amiens', latitude: 49.895, longitude: 2.302 },
  { id: '2', title: 'Cathédrale Notre-Dame', latitude: 49.8955, longitude: 2.303 },
];

const Index = () => {
  const [userLocation, setUserLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    };

    getLocation();
  }, []);

  const initialRegion = {
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Carte interactive</Text>

      {/* Bouton pour afficher la liste */}
      <TouchableOpacity style={styles.button} onPress={() => setShowList(true)}>
        <Text style={styles.buttonText}>Afficher la liste</Text>
      </TouchableOpacity>

      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        region={userLocation ? {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } : initialRegion}
        showsUserLocation={true}
        loadingEnabled={true}
      >
        {userLocation && (
          <Marker
            coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
            title="Vous êtes ici"
          />
        )}

        {POI.map((item) => (
          <Marker
            key={item.id}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            title={item.title}
          />
        ))}
      </MapView>

      {/* Modal avec liste */}
      <Modal visible={showList} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Liste des lieux</Text>
          <FlatList
            data={POI}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={styles.listItem}>{item.title}</Text>
            )}
          />
          <TouchableOpacity onPress={() => setShowList(false)} style={styles.buttonClose}>
            <Text style={styles.buttonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 10,
  },
  map: { flex: 1 },
  button: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  modalContent: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 18,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonClose: {
    marginTop: 20,
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
});

export default Index;
