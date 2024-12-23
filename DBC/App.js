// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, Clipboard, Alert, Image } from 'react-native';
import OpenAI from 'openai';

export default function App() {
  const [review, setReview] = useState('Your review will appear here');
  const [loading, setLoading] = useState(false);
  const [serverName, setServerName] = useState('');

  const generateReview = async () => {
    setLoading(true);
    setReview(''); 
    try {
      const client = new OpenAI({
        apiKey: '' 
      });

      
      const randomSeed = Math.random().toString(36).substring(7);

      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Generate a unique restaurant review. This review will specifically mention ${serverName || 'our server'} as the server. Pick a random item off the menu and generate a comment about it. Also add a compliment about ${serverName || 'our server'}'s service. Make it sound casual and natural. Keep it short and sweet. Don't use quotation marks around food names and don't be too descriptive of the food.`
              },
              {
                type: "image_url",
                image_url: {
                  url: "https://images.squarespace-cdn.com/content/v1/6530997c1362a1794ebd2844/b3d542db-95e5-42e5-bbd2-a1cddc500b40/FatSullysNYPizza_Menu_Apr24.jpg?format=2500w"
                }
              }
            ]
          }
        ],
        temperature: 0.7, 
        max_tokens: 100
      });

      setReview(completion.choices[0].message.content.trim());
    } catch (error) {
      setReview(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const copyReview = () => {
    if (review && review !== 'Your review will appear here') {
      Clipboard.setString(review);
      Alert.alert(
        'Copied!',
        'The review has been copied to your clipboard.',
        [{ text: 'OK', onPress: () => {} }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://images.squarespace-cdn.com/content/v1/6530997c1362a1794ebd2844/b7cd0ced-80f9-4c3f-bed2-bccaa672d95e/AC_Logo_Primary_RED.png?format=1500w' }} 
        style={styles.logo}
        resizeMode="contain"
      />
      
      <Text style={styles.title}></Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter server's name"
        value={serverName}
        onChangeText={setServerName}
      />
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={generateReview}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Generating...' : 'Generate Review'}
        </Text>
      </TouchableOpacity>

      <ScrollView style={styles.resultBox}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Generating review...</Text>
          </View>
        ) : (
          <>
            <Text style={styles.reviewText}>{review || 'Your review will appear here'}</Text>
            {review && review !== 'Your review will appear here' && (
              <TouchableOpacity 
                style={styles.copyButton} 
                onPress={copyReview}
              >
                <Text style={styles.copyButtonText}>Copy Review</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    width: '100%', 
    height: 100, 
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultBox: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  reviewText: {
    fontSize: 16,
    lineHeight: 24,
  },
  copyButton: {
    marginTop: 10,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  copyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});