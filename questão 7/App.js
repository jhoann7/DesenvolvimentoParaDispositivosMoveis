import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text, TextInput,
  Pressable, StyleSheet, StatusBar
} from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [percentual, setPercentual] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  function atualizar(campo, valor) {
    if (campo === 'nome') setNome(valor);
    if (campo === 'preco') setPreco(valor);
    if (campo === 'percentual') setPercentual(valor);
    setResultado(null);
    setErro('');
  }

  function lerNumero(texto) {
    const normalizado = texto.trim().replace(',', '.');
    if (!/^\d+(?:\.\d{1,2})?$/.test(normalizado)) return null;
    const numero = Number(normalizado);
    return Number.isFinite(numero) ? numero : null;
  }

  function moeda(centavos) {
    return (centavos / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  function aplicarDesconto() {
    if (!nome.trim()) {
      setErro('Informe o nome do produto.');
      setResultado(null);
      return;
    }

    const valor = lerNumero(preco);
    if (valor === null || valor < 0 || !Number.isSafeInteger(Math.round(valor * 100))) {
      setErro('Informe um preço válido, maior ou igual a zero.');
      setResultado(null);
      return;
    }

    const desconto = lerNumero(percentual);
    if (desconto === null || desconto < 0 || desconto > 100) {
      setErro('Informe um desconto entre 0% e 100%.');
      setResultado(null);
      return;
    }

    const precoCentavos = Math.round(valor * 100);
    const economiaCentavos = Math.round(precoCentavos * desconto / 100);
    const finalCentavos = precoCentavos - economiaCentavos;

    setResultado({
      produto: nome.trim(),
      original: precoCentavos,
      economia: economiaCentavos,
      final: finalCentavos,
      percentual: desconto
    });
    setErro('');
  }

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f6ff" />
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.cabecalho}>
          <Text style={styles.icone}>🏷️</Text>
          <Text style={styles.titulo}>Calculadora de desconto</Text>
          <Text style={styles.subtitulo}>
            Descubra quanto você economiza em uma compra.
          </Text>
        </View>

        <View style={styles.cartao}>
          <Text style={styles.rotulo}>Nome do produto</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Ex.: Mochila"
            placeholderTextColor="#91a0b2"
            value={nome}
            onChangeText={valor => atualizar('nome', valor)}
          />

          <Text style={[styles.rotulo, styles.espaco]}>Preço original (R$)</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Ex.: 200,00"
            placeholderTextColor="#91a0b2"
            keyboardType="decimal-pad"
            value={preco}
            onChangeText={valor => atualizar('preco', valor)}
          />

          <Text style={[styles.rotulo, styles.espaco]}>Desconto (%)</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Ex.: 15"
            placeholderTextColor="#91a0b2"
            keyboardType="decimal-pad"
            value={percentual}
            onChangeText={valor => atualizar('percentual', valor)}
          />

          {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

          <Pressable
            onPress={aplicarDesconto}
            style={({ pressed }) => [
              styles.botao,
              pressed && styles.botaoPressionado
            ]}
          >
            <Text style={styles.textoBotao}>Aplicar desconto</Text>
          </Pressable>

          {resultado !== null && (
            <View style={styles.resultado}>
              <Text style={styles.produto}>{resultado.produto}</Text>
              <View style={styles.linha}>
                <Text style={styles.descricao}>Preço original</Text>
                <Text style={styles.valor}>{moeda(resultado.original)}</Text>
              </View>
              <View style={styles.linha}>
                <Text style={styles.descricao}>
                  Economia ({resultado.percentual}%)
                </Text>
                <Text style={styles.economia}>− {moeda(resultado.economia)}</Text>
              </View>
              <View style={styles.divisor} />
              <Text style={styles.rotuloFinal}>Preço final</Text>
              <Text style={styles.precoFinal}>{moeda(resultado.final)}</Text>
            </View>
          )}
        </View>

        <Text style={styles.rodape}>
          Economia = preço × desconto / 100. Preço final = preço − economia.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#f1f6ff' },
  conteudo: { flexGrow: 1, justifyContent: 'center', padding: 22, paddingVertical: 35 },
  cabecalho: { alignItems: 'center', marginBottom: 24 },
  icone: { fontSize: 52, marginBottom: 8 },
  titulo: { fontSize: 27, fontWeight: '800', color: '#1e3e67', textAlign: 'center' },
  subtitulo: { fontSize: 14, color: '#647b94', textAlign: 'center', marginTop: 8, lineHeight: 21 },
  cartao: { backgroundColor: '#fff', borderRadius: 19, padding: 22, elevation: 3, shadowColor: '#173b61', shadowOpacity: 0.08, shadowRadius: 11 },
  rotulo: { fontSize: 15, fontWeight: '700', color: '#294c70', marginBottom: 8 },
  espaco: { marginTop: 18 },
  entrada: { borderWidth: 1.5, borderColor: '#d4e0ed', borderRadius: 12, paddingHorizontal: 15, paddingVertical: 13, backgroundColor: '#fafcff', fontSize: 17, color: '#1e3e67' },
  erro: { fontSize: 14, color: '#b82d3e', marginTop: 16 },
  botao: { backgroundColor: '#2869cf', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 23 },
  botaoPressionado: { opacity: 0.8 },
  textoBotao: { color: '#fff', fontSize: 17, fontWeight: '800' },
  resultado: { backgroundColor: '#eaf7ef', borderRadius: 14, padding: 19, marginTop: 22 },
  produto: { fontSize: 18, fontWeight: '800', color: '#1e6046', textAlign: 'center', marginBottom: 16 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 8 },
  descricao: { color: '#496d5a', fontSize: 14, flexShrink: 1 },
  valor: { color: '#234c38', fontSize: 15, fontWeight: '700' },
  economia: { color: '#188451', fontSize: 15, fontWeight: '800' },
  divisor: { height: 1, backgroundColor: '#c5e4d2', marginVertical: 6 },
  rotuloFinal: { color: '#3f7458', fontSize: 14, textAlign: 'center', marginTop: 12 },
  precoFinal: { fontSize: 35, fontWeight: '900', color: '#147044', textAlign: 'center', marginTop: 5 },
  rodape: { color: '#75879c', fontSize: 12, textAlign: 'center', lineHeight: 19, marginTop: 23 }
});
