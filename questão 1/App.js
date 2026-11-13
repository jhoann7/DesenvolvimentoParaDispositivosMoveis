import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Pressable, StyleSheet, StatusBar, ScrollView } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  function calcular() {
    const calculo = calcularConsumoAgua(peso);
    if (!calculo.valido) {
      setErro(calculo.erro);
      setResultado(null);
      return;
    }
    setErro('');
    setResultado(calculo.litros.toFixed(2).replace('.', ','));
  }

  function alterarPeso(valor) {
    setPeso(valor);
    setErro('');
    setResultado(null);
  }

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="dark-content" backgroundColor="#eff8ff" />
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <View style={styles.cabecalho}>
          <Text style={styles.icone}>💧</Text>
          <Text style={styles.titulo}>Água por dia</Text>
          <Text style={styles.subtitulo}>Calcule uma estimativa diária de hidratação com base no seu peso.</Text>
        </View>
        <View style={styles.cartao}>
          <Text style={styles.rotulo}>Seu peso (kg)</Text>
          <TextInput
            style={[styles.entrada, erro ? styles.entradaErro : null]}
            placeholder="Ex.: 70"
            placeholderTextColor="#8798a7"
            keyboardType="decimal-pad"
            value={peso}
            onChangeText={alterarPeso}
            accessibilityLabel="Peso em quilogramas"
          />
          {erro ? <Text style={styles.erro} accessibilityRole="alert">{erro}</Text> : null}
          <Pressable style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]} onPress={calcular} accessibilityRole="button">
            <Text style={styles.textoBotao}>Calcular</Text>
          </Pressable>
          {resultado !== null && (
            <View style={styles.resultado}>
              <Text style={styles.resultadoLegenda}>Estimativa de consumo diário</Text>
              <Text style={styles.resultadoValor}>{resultado} litros</Text>
              <Text style={styles.resultadoDetalhe}>de água por dia</Text>
            </View>
          )}
        </View>
        <Text style={styles.aviso}>Estimativa didática: 35 ml por kg de peso corporal. As necessidades reais variam conforme condições individuais e ambientais.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#eff8ff' },
  conteudo: { flexGrow: 1, justifyContent: 'center', padding: 24, paddingVertical: 48 },
  cabecalho: { alignItems: 'center', marginBottom: 30 },
  icone: { fontSize: 58, marginBottom: 12 },
  titulo: { fontSize: 31, fontWeight: '800', color: '#153f60', textAlign: 'center' },
  subtitulo: { fontSize: 15, lineHeight: 23, color: '#587389', textAlign: 'center', marginTop: 10 },
  cartao: { backgroundColor: '#fff', padding: 24, borderRadius: 22, elevation: 3, shadowColor: '#163c5b', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } },
  rotulo: { fontSize: 16, fontWeight: '700', color: '#23485f', marginBottom: 10 },
  entrada: { borderWidth: 1.5, borderColor: '#cbdfe9', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 19, color: '#153f60', backgroundColor: '#f9fcff' },
  entradaErro: { borderColor: '#c83d4b' },
  erro: { color: '#b42332', fontSize: 13, marginTop: 9 },
  botao: { marginTop: 20, backgroundColor: '#0879bd', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  botaoPressionado: { opacity: 0.8 },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 17 },
  resultado: { marginTop: 24, padding: 20, backgroundColor: '#e7f6ff', borderRadius: 14, alignItems: 'center' },
  resultadoLegenda: { color: '#356580', fontSize: 14, textAlign: 'center' },
  resultadoValor: { color: '#075b91', fontWeight: '800', fontSize: 29, marginTop: 8 },
  resultadoDetalhe: { color: '#356580', fontSize: 14, marginTop: 4 },
  aviso: { fontSize: 12, color: '#668297', textAlign: 'center', lineHeight: 19, marginTop: 24 }
});

// Lógica local: este App.js funciona sozinho no Expo Snack.
function calcularConsumoAgua(entrada) {
  const texto = String(entrada ?? '').trim();
  if (!texto) return { valido: false, erro: 'Informe seu peso em quilogramas.' };
  const normalizado = texto.replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(normalizado)) return { valido: false, erro: 'Digite um peso válido maior que zero.' };
  const peso = Number(normalizado);
  if (!Number.isFinite(peso) || peso <= 0) return { valido: false, erro: 'Digite um peso válido maior que zero.' };
  return { valido: true, litros: peso * 35 / 1000 };
}
