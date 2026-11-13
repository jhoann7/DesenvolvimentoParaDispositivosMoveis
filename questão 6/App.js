import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text, Pressable,
  StyleSheet, StatusBar
} from 'react-native';

const CANDIDATOS = ['Ana Silva', 'Bruno Costa', 'Carla Souza'];

export default function App() {
  const [votos, setVotos] = useState([0, 0, 0]);

  function registrarVoto(indice) {
    setVotos(anteriores =>
      anteriores.map((quantidade, i) =>
        i === indice ? quantidade + 1 : quantidade
      )
    );
  }

  const total = votos.reduce((soma, quantidade) => soma + quantidade, 0);
  const maiorVotacao = Math.max(...votos);
  const lideres = CANDIDATOS.filter((_, indice) => votos[indice] === maiorVotacao);
  const empate = lideres.length > 1;

  function situacao() {
    if (total === 0) return 'Nenhum voto registrado ainda.';
    if (empate) return 'Empate na liderança: ' + lideres.join(', ') + '.';
    return 'Mais votado(a): ' + lideres[0] + ' (' + maiorVotacao + ' votos).';
  }

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f6ff" />
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.cabecalho}>
          <Text style={styles.icone}>🗳️</Text>
          <Text style={styles.titulo}>Simulador de votação</Text>
          <Text style={styles.subtitulo}>
            Toque no botão de um candidato para registrar um voto.
          </Text>
        </View>

        {CANDIDATOS.map((candidato, indice) => (
          <View key={candidato} style={styles.cartao}>
            <View style={styles.linha}>
              <View style={styles.identificacao}>
                <Text style={styles.numeroCandidato}>Candidato {indice + 1}</Text>
                <Text style={styles.nome}>{candidato}</Text>
              </View>
              <View style={styles.contador}>
                <Text style={styles.numeroVotos}>{votos[indice]}</Text>
                <Text style={styles.legendaVotos}>votos</Text>
              </View>
            </View>
            <Pressable
              onPress={() => registrarVoto(indice)}
              style={({ pressed }) => [
                styles.botao,
                pressed && styles.botaoPressionado
              ]}
            >
              <Text style={styles.textoBotao}>Votar em {candidato}</Text>
            </Pressable>
          </View>
        ))}

        <View style={styles.resumo}>
          <Text style={styles.tituloResumo}>Resultado parcial</Text>
          <Text style={styles.rotuloTotal}>Total geral de votos</Text>
          <Text style={styles.total}>{total}</Text>
          <View style={styles.divisor} />
          <Text style={styles.situacao}>{situacao()}</Text>
        </View>

        <Text style={styles.rodape}>
          Votação fictícia para fins didáticos. Os votos são mantidos
          somente enquanto o aplicativo estiver aberto.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#f1f6ff' },
  conteudo: { flexGrow: 1, padding: 22, paddingVertical: 34 },
  cabecalho: { alignItems: 'center', marginBottom: 22 },
  icone: { fontSize: 49, marginBottom: 8 },
  titulo: { fontSize: 27, fontWeight: '800', color: '#1e3e67', textAlign: 'center' },
  subtitulo: { fontSize: 14, color: '#637b94', textAlign: 'center', lineHeight: 21, marginTop: 8 },
  cartao: {
    backgroundColor: '#fff', borderRadius: 17, padding: 19,
    marginBottom: 13, elevation: 2, shadowColor: '#173b61',
    shadowOpacity: 0.07, shadowRadius: 9
  },
  linha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  identificacao: { flex: 1, paddingRight: 10 },
  numeroCandidato: { fontSize: 12, color: '#75879c', fontWeight: '600' },
  nome: { fontSize: 19, color: '#24496f', fontWeight: '800', marginTop: 5 },
  contador: { alignItems: 'center', backgroundColor: '#eaf2ff', borderRadius: 12, paddingVertical: 9, paddingHorizontal: 17 },
  numeroVotos: { fontSize: 26, fontWeight: '900', color: '#2564c5' },
  legendaVotos: { fontSize: 12, color: '#58769a' },
  botao: { backgroundColor: '#2869cf', borderRadius: 11, paddingVertical: 13, alignItems: 'center', marginTop: 16 },
  botaoPressionado: { opacity: 0.78 },
  textoBotao: { fontSize: 15, color: '#fff', fontWeight: '800' },
  resumo: { backgroundColor: '#e4f4ed', borderRadius: 17, padding: 22, marginTop: 5, alignItems: 'center' },
  tituloResumo: { fontSize: 19, fontWeight: '800', color: '#1e6046' },
  rotuloTotal: { fontSize: 13, color: '#4e806c', marginTop: 15 },
  total: { fontSize: 42, fontWeight: '900', color: '#187449', marginTop: 2 },
  divisor: { height: 1, backgroundColor: '#c6e3d4', width: '100%', marginVertical: 16 },
  situacao: { fontSize: 16, fontWeight: '700', color: '#1e6046', textAlign: 'center', lineHeight: 23 },
  rodape: { fontSize: 12, color: '#74879a', textAlign: 'center', lineHeight: 18, marginTop: 21 }
});
