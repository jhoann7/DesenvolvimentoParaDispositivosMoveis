import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text, Pressable,
  StyleSheet, StatusBar
} from 'react-native';

const PRODUTOS = [
  { id: 1, nome: 'Sanduíche', preco: 800, emoji: '🥪' },
  { id: 2, nome: 'Suco', preco: 500, emoji: '🧃' },
  { id: 3, nome: 'Batata frita', preco: 700, emoji: '🍟' },
  { id: 4, nome: 'Hambúrguer', preco: 1500, emoji: '🍔' }
];

export default function App() {
  const [quantidades, setQuantidades] = useState({});
  const [itens, setItens] = useState([]);
  const [resumoFinal, setResumoFinal] = useState(false);

  function formatarMoeda(centavos) {
    return (centavos / 100).toLocaleString('pt-BR', {
      style: 'currency', currency: 'BRL'
    });
  }

  function alterarQuantidade(id, diferenca) {
    setQuantidades(anteriores => ({
      ...anteriores,
      [id]: Math.max(0, Math.min(99, (anteriores[id] || 0) + diferenca))
    }));
  }

  function adicionar(produto) {
    const quantidade = quantidades[produto.id] || 0;
    if (quantidade === 0) return;

    setItens(anteriores => {
      const existente = anteriores.find(item => item.id === produto.id);

      if (existente) {
        return anteriores.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }

      return [...anteriores, {
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade
      }];
    });

    setQuantidades(anteriores => ({ ...anteriores, [produto.id]: 0 }));
    setResumoFinal(false);
  }

  function remover(id) {
    setItens(anteriores => anteriores.filter(item => item.id !== id));
    setResumoFinal(false);
  }

  const total = itens.reduce(
    (soma, item) => soma + item.preco * item.quantidade, 0
  );

  const quantidadeTotal = itens.reduce(
    (soma, item) => soma + item.quantidade, 0
  );

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f6ff" />
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.cabecalho}>
          <Text style={styles.icone}>🛒</Text>
          <Text style={styles.titulo}>Monte seu pedido</Text>
          <Text style={styles.subtitulo}>
            Escolha os produtos e suas quantidades.
          </Text>
        </View>

        <Text style={styles.secao}>Cardápio</Text>
        {PRODUTOS.map(produto => (
          <View key={produto.id} style={styles.cartao}>
            <View style={styles.linha}>
              <Text style={styles.emoji}>{produto.emoji}</Text>
              <View style={styles.informacoes}>
                <Text style={styles.nome}>{produto.nome}</Text>
                <Text style={styles.preco}>{formatarMoeda(produto.preco)}</Text>
              </View>
              <View style={styles.controle}>
                <Pressable
                  style={styles.botaoQuantidade}
                  onPress={() => alterarQuantidade(produto.id, -1)}
                >
                  <Text style={styles.simbolo}>−</Text>
                </Pressable>
                <Text style={styles.quantidade}>{quantidades[produto.id] || 0}</Text>
                <Pressable
                  style={styles.botaoQuantidade}
                  onPress={() => alterarQuantidade(produto.id, 1)}
                >
                  <Text style={styles.simbolo}>+</Text>
                </Pressable>
              </View>
            </View>

            <Pressable
              disabled={!quantidades[produto.id]}
              style={({ pressed }) => [
                styles.botaoAdicionar,
                !quantidades[produto.id] && styles.desabilitado,
                pressed && styles.pressionado
              ]}
              onPress={() => adicionar(produto)}
            >
              <Text style={styles.textoAdicionar}>Adicionar ao pedido</Text>
            </Pressable>
          </View>
        ))}

        <View style={styles.cabecalhoPedido}>
          <Text style={styles.secao}>Meu pedido</Text>
          <Text style={styles.contador}>{quantidadeTotal} itens</Text>
        </View>

        <View style={styles.cartaoPedido}>
          {itens.length === 0 ? (
            <Text style={styles.vazio}>Seu pedido ainda está vazio.</Text>
          ) : (
            itens.map(item => (
              <View key={item.id} style={styles.itemPedido}>
                <View style={styles.itemInfo}>
                  <Text style={styles.nomeItem}>{item.nome}</Text>
                  <Text style={styles.detalheItem}>
                    {item.quantidade} × {formatarMoeda(item.preco)}
                  </Text>
                </View>
                <View style={styles.itemAcoes}>
                  <Text style={styles.subtotal}>
                    {formatarMoeda(item.preco * item.quantidade)}
                  </Text>
                  <Pressable onPress={() => remover(item.id)}>
                    <Text style={styles.remover}>Remover</Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}

          <View style={styles.divisor} />
          <View style={styles.linhaTotal}>
            <Text style={styles.rotuloTotal}>Total do pedido</Text>
            <Text style={styles.total}>{formatarMoeda(total)}</Text>
          </View>

          <Pressable
            disabled={itens.length === 0}
            style={({ pressed }) => [
              styles.botaoFinalizar,
              itens.length === 0 && styles.desabilitado,
              pressed && styles.pressionado
            ]}
            onPress={() => setResumoFinal(true)}
          >
            <Text style={styles.textoFinalizar}>Ver resumo final</Text>
          </Pressable>
        </View>

        {resumoFinal && itens.length > 0 && (
          <View style={styles.resumo}>
            <Text style={styles.tituloResumo}>Resumo final do pedido</Text>
            {itens.map(item => (
              <View key={item.id} style={styles.linhaResumo}>
                <Text style={styles.textoResumo}>
                  {item.quantidade} × {item.nome}
                </Text>
                <Text style={styles.textoResumo}>
                  {formatarMoeda(item.preco * item.quantidade)}
                </Text>
              </View>
            ))}
            <View style={styles.divisor} />
            <Text style={styles.totalResumo}>
              Total: {formatarMoeda(total)}
            </Text>
            <Text style={styles.aviso}>
              Resumo demonstrativo. Nenhuma compra real foi realizada.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#f1f6ff' },
  conteudo: { padding: 20, paddingVertical: 32 },
  cabecalho: { alignItems: 'center', marginBottom: 23 },
  icone: { fontSize: 48, marginBottom: 8 },
  titulo: { fontSize: 28, fontWeight: '800', color: '#1e3e67' },
  subtitulo: { color: '#637b94', fontSize: 14, textAlign: 'center', marginTop: 7 },
  secao: { fontSize: 20, fontWeight: '800', color: '#24496f', marginBottom: 12 },
  cartao: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, elevation: 2, shadowColor: '#173b61', shadowOpacity: 0.07, shadowRadius: 8 },
  linha: { flexDirection: 'row', alignItems: 'center' },
  emoji: { fontSize: 34, marginRight: 12 },
  informacoes: { flex: 1 },
  nome: { fontSize: 16, fontWeight: '800', color: '#24496f' },
  preco: { color: '#16845d', fontSize: 15, fontWeight: '700', marginTop: 5 },
  controle: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  botaoQuantidade: { width: 32, height: 32, borderRadius: 9, backgroundColor: '#e5efff', alignItems: 'center', justifyContent: 'center' },
  simbolo: { fontSize: 20, color: '#2564c5', fontWeight: '800' },
  quantidade: { minWidth: 18, textAlign: 'center', color: '#24496f', fontWeight: '800', fontSize: 16 },
  botaoAdicionar: { backgroundColor: '#2869cf', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 15 },
  textoAdicionar: { color: '#fff', fontSize: 14, fontWeight: '800' },
  desabilitado: { opacity: 0.4 },
  pressionado: { opacity: 0.75 },
  cabecalhoPedido: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  contador: { color: '#2564c5', backgroundColor: '#dceaff', borderRadius: 20, overflow: 'hidden', paddingHorizontal: 12, paddingVertical: 5, fontWeight: '800' },
  cartaoPedido: { backgroundColor: '#fff', borderRadius: 17, padding: 18 },
  vazio: { color: '#7a8da2', textAlign: 'center', paddingVertical: 18 },
  itemPedido: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eef2f7', gap: 10 },
  itemInfo: { flex: 1 },
  nomeItem: { fontSize: 15, fontWeight: '800', color: '#24496f' },
  detalheItem: { color: '#70859b', marginTop: 5, fontSize: 13 },
  itemAcoes: { alignItems: 'flex-end' },
  subtotal: { fontSize: 15, fontWeight: '800', color: '#24496f' },
  remover: { color: '#bf3549', marginTop: 7, fontSize: 13, fontWeight: '700' },
  divisor: { height: 1, backgroundColor: '#dce6f0', marginVertical: 16 },
  linhaTotal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rotuloTotal: { fontSize: 15, fontWeight: '700', color: '#24496f' },
  total: { fontSize: 24, fontWeight: '900', color: '#16845d' },
  botaoFinalizar: { backgroundColor: '#16845d', borderRadius: 11, alignItems: 'center', paddingVertical: 15, marginTop: 20 },
  textoFinalizar: { color: '#fff', fontWeight: '800', fontSize: 16 },
  resumo: { backgroundColor: '#e4f4ed', borderRadius: 17, padding: 20, marginTop: 16 },
  tituloResumo: { color: '#1e6046', fontSize: 19, fontWeight: '800', marginBottom: 14 },
  linhaResumo: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 10 },
  textoResumo: { color: '#2e6149', fontSize: 14 },
  totalResumo: { color: '#187449', fontSize: 23, fontWeight: '900', textAlign: 'right' },
  aviso: { color: '#648873', fontSize: 12, textAlign: 'center', marginTop: 15 }
});
