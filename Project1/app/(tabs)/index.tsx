import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const COLORS = ['Kırmızı', 'Mavi', 'Yeşil', 'Sarı', 'Turuncu', 'Mor', 'Pembe'];

export default function App() {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const shuffled = [...COLORS].sort(() => 0.5 - Math.random()); // Renk listesini karıştır
    const choices = shuffled.slice(0, 3); // 3 seçenek seç
    const answer = choices[Math.floor(Math.random() * choices.length)]; // İçlerinden biri doğru cevap olsun

    setOptions(choices);
    setQuestion(answer);
  };


  const handleAnswer = (selected) => {
    if (selected === question) {
      setScore(score + 1);
      Alert.alert('Doğru!', 'Skor +1', [{ text: 'Devam', onPress: generateQuestion }]);
    } else {
      Alert.alert('Yanlış', `Doğru cevap: ${question}`, [
        { text: 'Tekrar Dene', onPress: generateQuestion },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Renk Tahmin Oyunu</Text>
      <Text style={styles.score}>Skor: {score}</Text>
      <Text style={styles.question}>Hangi renk: {question}?</Text>

      <View style={styles.options}>
        {options.map((color) => (
          <TouchableOpacity
            key={color}
            style={styles.button}
            onPress={() => handleAnswer(color)}
          >
            <Text style={styles.buttonText}>{color}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  question: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  options: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4c8bf5',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
