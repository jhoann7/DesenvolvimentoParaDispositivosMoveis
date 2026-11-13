import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Pressable, StyleSheet, StatusBar } from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [notas, setNotas] = useState(['', '', '']);
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  function alterarNota(indice, valor) {
    setNotas(anteriores => anteriores.map((nota, i) => i === indice ? valor : nota));
    setResultado(null);
    setErro('');
  }

  function calcularMedia() {
    if (!nome.trim()) {
      setErro('Informe o nome do estudante.');
      setResultado(null);
      return;
    }

    const valores = [];
    for (let i = 0; i < 3; i++) {
      const texto = notas[i].trim().replace(',', '.');
      if (!texto || !/^\d+(\.\d+)?$/.test(texto)) {
        setErro('Informe uma nota válida no campo Nota ' + (i + 1) + '.');
        setResultado(null);
        return;
      }
      const nota = Number(texto);
      if (!Number.isFinite(nota) || nota < 0 || nota > 10) {
        setErro('A Nota ' + (i + 1) + ' deve estar entre 0 e 10.');
        setResultado(null);
        return;
      }
      valores.push(nota);
    }

    const media = (valores[0] + valores[1] + valores[2]) / 3;
    setResultado({ media: media.toFixed(1).replace('.', ','), aprovado: media >= 7 });
    setErro('');
  }

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f5ff" />
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <View style={styles.cabecalho}>
          <Text style={styles.icone}>🎓</Text>
          <Text style={styles.titulo}>Média escolar</Text>
          <Text style={styles.subtitulo}>Informe o nome e as três notas do estudante.</Text>
        </View>

        <View style={styles.cartao}>
          <Text style={styles.rotulo}>Nome do estudante</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Ex.: Maria Silva"
            placeholderTextColor="#91a0b2"
            value={nome}
            onChangeText={valor => { setNome(valor); setErro(''); setResultado(null); }}
            autoCapitalize="words"
          />

          {notas.map((nota, indice) => (
            <View key={indice} style={styles.grupoNota}>
              <Text style={styles.rotulo}>Nota {indice + 1}</Text>
              <TextInput
                style={styles.entrada}
                placeholder="De 0 a 10"
                placeholderTextColor="#91a0b2"
                keyboardType="decimal-pad"
                value={nota}
                onChangeText={valor => alterarNota(indice, valor)}
              />
            </View>
          ))}

          {erro ? <Text style={styles.erro}>{erro}</Text> : null}

          <Pressable
            onPress={calcularMedia}
            style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
          >
            <Text style={styles.textoBotao}>Calcular média</Text>
          </Pressable>

          {resultado && (
            <View style={[styles.resultado, resultado.aprovado ? styles.aprovado : styles.reprovado]}>
              <Text style={styles.resultadoNome}>{nome.trim()}</Text>
              <Text style={styles.legenda}>Média aritmética</Text>
              <Text style={styles.media}>{resultado.media}</Text>
              <Text style={[styles.situacao, resultado.aprovado ? styles.textoAprovado : styles.textoReprovado]}>
                {resultado.aprovado ? '✓ Aprovado' : '✕ Reprovado'}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.rodape}>Aprovação com média maior ou igual a 7,0. Notas permitidas: 0 a 10.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#f0f5ff' },
  conteudo: { flexGrow: 1, justifyContent: 'center', padding: 22, paddingVertical: 38 },
  cabecalho: { alignItems: 'center', marginBottom: 25 },
  icone: { fontSize: 52, marginBottom: 8 },
  titulo: { fontSize: 30, fontWeight: '800', color: '#203b67' },
  subtitulo: { fontSize: 15, color: '#60748f', textAlign: 'center', marginTop: 8, lineHeight: 22 },
  cartao: { backgroundColor: '#fff', borderRadius: 20, padding: 22, elevation: 3, shadowColor: '#223d64', shadowOpacity: 0.08, shadowRadius: 12 },
  rotulo: { fontSize: 15, fontWeight: '700', color: '#294665', marginBottom: 8 },
  entrada: { borderWidth: 1.5, borderColor: '#d6e0ec', borderRadius: 12, backgroundColor: '#fafcff', paddingHorizontal: 15, paddingVertical: 12, fontSize: 17, color: '#203b67' },
  grupoNota: { marginTop: 17 },
  erro: { marginTop: 15, color: '#bb293a', fontSize: 14 },
  botao: { backgroundColor: '#2864ce', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 22 },
  botaoPressionado: { opacity: 0.8 },
  textoBotao: { color: '#fff', fontSize: 17, fontWeight: '700' },
  resultado: { marginTop: 22, borderRadius: 14, padding: 20, alignItems: 'center' },
  aprovado: { backgroundColor: '#e9f8ef' },
  reprovado: { backgroundColor: '#fff0f0' },
  resultadoNome: { fontSize: 17, fontWeight: '700', color: '#294665', marginBottom: 8 },
  legenda: { color: '#60748f', fontSize: 14 },
  media: { fontSize: 38, fontWeight: '800', color: '#203b67', marginVertical: 5 },
  situacao: { fontSize: 19, fontWeight: '800' },
  textoAprovado: { color: '#167747' },
  textoReprovado: { color: '#b72b39' },
  rodape: { fontSize: 12, color: '#71839a', textAlign: 'center', lineHeight: 19, marginTop: 22 }
});
