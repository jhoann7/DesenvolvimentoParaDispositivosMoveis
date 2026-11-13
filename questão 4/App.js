import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text, TextInput,
  Pressable, StyleSheet, StatusBar
} from 'react-native';

export default function App() {
  const [temperatura, setTemperatura] = useState('');
  const [sentido, setSentido] = useState('C_F');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  function alterarTemperatura(valor) {
    setTemperatura(valor);
    setResultado(null);
    setErro('');
  }

  function escolherSentido(opcao) {
    setSentido(opcao);
    setResultado(null);
    setErro('');
  }

  function converter() {
    const texto = temperatura.trim().replace(',', '.');

    if (!texto) {
      setErro('Informe a temperatura que deseja converter.');
      setResultado(null);
      return;
    }

    if (!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(texto)) {
      setErro('Digite um número válido. Ex.: 25 ou -10,5.');
      setResultado(null);
      return;
    }

    const valor = Number(texto);
    if (!Number.isFinite(valor)) {
      setErro('Informe uma temperatura válida.');
      setResultado(null);
      return;
    }

    const convertido = sentido === 'C_F'
      ? (valor * 9 / 5) + 32
      : (valor - 32) * 5 / 9;

    setResultado({
      origem: valor.toFixed(2).replace('.', ','),
      destino: convertido.toFixed(2).replace('.', ','),
      unidadeOrigem: sentido === 'C_F' ? '°C' : '°F',
      unidadeDestino: sentido === 'C_F' ? '°F' : '°C'
    });
    setErro('');
  }

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f6ff" />
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <View style={styles.cabecalho}>
          <Text style={styles.icone}>🌡️</Text>
          <Text style={styles.titulo}>Conversor de temperatura</Text>
          <Text style={styles.subtitulo}>Converta valores entre Celsius e Fahrenheit.</Text>
        </View>

        <View style={styles.cartao}>
          <Text style={styles.rotulo}>Temperatura</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Ex.: 25"
            placeholderTextColor="#91a0b2"
            keyboardType="numbers-and-punctuation"
            value={temperatura}
            onChangeText={alterarTemperatura}
          />

          <Text style={[styles.rotulo, styles.espaco]}>Sentido da conversão</Text>
          <View style={styles.opcoes}>
            <Pressable
              onPress={() => escolherSentido('C_F')}
              style={[styles.opcao, sentido === 'C_F' && styles.opcaoSelecionada]}
            >
              <Text style={[styles.textoOpcao, sentido === 'C_F' && styles.textoSelecionado]}>
                °C → °F
              </Text>
              <Text style={[styles.detalheOpcao, sentido === 'C_F' && styles.textoSelecionado]}>
                Celsius para Fahrenheit
              </Text>
            </Pressable>
            <Pressable
              onPress={() => escolherSentido('F_C')}
              style={[styles.opcao, sentido === 'F_C' && styles.opcaoSelecionada]}
            >
              <Text style={[styles.textoOpcao, sentido === 'F_C' && styles.textoSelecionado]}>
                °F → °C
              </Text>
              <Text style={[styles.detalheOpcao, sentido === 'F_C' && styles.textoSelecionado]}>
                Fahrenheit para Celsius
              </Text>
            </Pressable>
          </View>

          {erro ? <Text style={styles.erro}>{erro}</Text> : null}

          <Pressable
            onPress={converter}
            style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
          >
            <Text style={styles.textoBotao}>Converter temperatura</Text>
          </Pressable>

          {resultado !== null && (
            <View style={styles.resultado}>
              <Text style={styles.legenda}>Resultado da conversão</Text>
              <Text style={styles.origem}>
                {resultado.origem} {resultado.unidadeOrigem}
              </Text>
              <Text style={styles.seta}>↓</Text>
              <Text style={styles.valorResultado}>
                {resultado.destino} {resultado.unidadeDestino}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.rodape}>
          °F = (°C × 9/5) + 32   |   °C = (°F − 32) × 5/9
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#f1f6ff' },
  conteudo: { flexGrow: 1, justifyContent: 'center', padding: 22, paddingVertical: 38 },
  cabecalho: { alignItems: 'center', marginBottom: 26 },
  icone: { fontSize: 54, marginBottom: 10 },
  titulo: { fontSize: 28, fontWeight: '800', color: '#193d68', textAlign: 'center' },
  subtitulo: { fontSize: 15, lineHeight: 22, color: '#647990', textAlign: 'center', marginTop: 9 },
  cartao: { backgroundColor: '#fff', borderRadius: 20, padding: 22, elevation: 3, shadowColor: '#173b61', shadowOpacity: 0.08, shadowRadius: 12 },
  rotulo: { fontSize: 15, fontWeight: '700', color: '#294d71', marginBottom: 10 },
  entrada: { borderWidth: 1.5, borderColor: '#d1dfed', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#fafcff', fontSize: 19, color: '#193d68' },
  espaco: { marginTop: 23 },
  opcoes: { flexDirection: 'row', gap: 10 },
  opcao: { flex: 1, borderWidth: 1.5, borderColor: '#d1dfed', borderRadius: 12, padding: 12, alignItems: 'center', justifyContent: 'center', minHeight: 84 },
  opcaoSelecionada: { backgroundColor: '#e7f0ff', borderColor: '#2768ce' },
  textoOpcao: { fontSize: 20, fontWeight: '800', color: '#315476' },
  detalheOpcao: { fontSize: 11, color: '#70849a', textAlign: 'center', marginTop: 6 },
  textoSelecionado: { color: '#1e5caf' },
  erro: { fontSize: 13, color: '#b62c3d', marginTop: 14 },
  botao: { backgroundColor: '#2869d0', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 22 },
  botaoPressionado: { opacity: 0.8 },
  textoBotao: { color: '#fff', fontSize: 17, fontWeight: '800' },
  resultado: { backgroundColor: '#e8f6ff', borderRadius: 14, padding: 20, alignItems: 'center', marginTop: 22 },
  legenda: { fontSize: 14, color: '#426982', marginBottom: 12 },
  origem: { fontSize: 17, color: '#4b708b', fontWeight: '600' },
  seta: { fontSize: 25, color: '#2869d0', marginVertical: 4 },
  valorResultado: { fontSize: 32, fontWeight: '900', color: '#115f9d', textAlign: 'center' },
  rodape: { fontSize: 12, color: '#74869a', textAlign: 'center', lineHeight: 20, marginTop: 24 }
});
