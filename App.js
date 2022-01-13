import React, { useEffect, useState } from 'react';
import {Linking,TouchableOpacity, Image, ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      'https://newsapi.org/v2/everything?q=tesla&from=2021-12-13&sortBy=publishedAt&apiKey=f2d96f98568a491bb0241111722f2ac9'
    )
      .then((response) => response.json())
      .then((json) => setData(json.articles))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#333333', padding: 10 }}>
    <Text style={{ marginTop: 30, marginBottom: 5, color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}> Jaunākas Elektrisko auto ziņas </Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View
              style={{ marginTop: 10, backgroundColor: '#fff', padding: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {item.title} {item.id} {"\n"}
              </Text>
              <Text>
                <View>
                <TouchableOpacity onPress={() =>Linking.openURL(item.url)}>
                  <Image style = {{alignItems: 'center', justifyContent: 'center', width: 350, height: 170}}
                    source={{ uri: item.urlToImage }}
                    
                      />
                  </TouchableOpacity>
                </View>
                {"\n"}Autors: {item.author}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}