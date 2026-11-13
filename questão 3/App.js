import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text, TextInput,
  Pressable, StyleSheet, StatusBar
} from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [quantidadeInicial, setQuantidadeInicial] = useState('');
  const [movimentacao, setMovimentacao] = useState('');
  const [estoque, setEstoque] = useState(null);
  const [produto, setProduto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('erro');

  function inteiroValido(texto, permiteZero = false) {
    const valor = texto.trim();
    if (!/^\d+$/.test(valor)) return null;
    const numero = Number(valor);
    if (!Number.isSafeInteger(numero)) return null;
    if (permiteZero ? numero < 0 : numero <= 0) return null;
    return numero;
  }

  function avisar(texto, tipo = 'erro') {
    setMensagem(texto);
    setTipoMensagem(tipo);
  }

  function iniciarEstoque() {
    const nomeLimpo = nome.trim();
    const inicial = inteiroValido(quantidadeInicial, true);

    if (!nomeLimpo) {
      avisar('Informe o nome do produto.');
      return;
    }
    if (inicial === null) {
      avisar('A quantidade inicial deve ser um número inteiro maior ou igual a zero.');
      return;
    }

    setProduto(nomeLimpo);
    setEstoque(inicial);
    setMovimentacao('');
    avisar('Estoque inicial registrado com sucesso!', 'sucesso');
  }

  function movimentar(operacao) {
    if (estoque === null) {
      avisar('Primeiro, registre o estoque inicial.');
      return;
    }

    const quantidade = inteiroValido(movimentacao);
    if (quantidade === null) {
      avisar('Informe uma movimentação inteira maior que zero.');
      return;
    }

    if (operacao === 'retirar' && quantidade > estoque) {
      avisar('Retirada não permitida: existem apenas ' + estoque + ' unidades disponíveis.');
      return;
    }

    if (operacao === 'adicionar' && !Number.isSafeInteger(estoque + quantidade)) {
      avisar('A quantidade informada excede o limite permitido.');
      return;
    }

    const novoEstoque = operacao === 'adicionar'
      ? estoque + quantidade
      : estoque - quantidade;

    setEstoque(novoEstoque);
    setMovimentacao('');
    avisar(
      quantidade + (operacao === 'adicionar'
        ? ' unidade(s) adicionada(s) ao estoque.'
        : ' unidade(s) retirada(s) do estoque.'),
      'sucesso'
    );
  }

  function alterarCadastro(campo, valor) {
    if (campo === 'nome') setNome(valor);
    else setQuantidadeInicial(valor);
    setProduto('');
    setEstoque(null);
    setMovimentacao('');
    setMensagem('');
  }

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f6ff" />
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <View style={styles.cabecalho}>
          <Text style={styles.icone}>📦</Text>
          <Text style={styles.titulo}>Controle de estoque</Text>
          <Text style={styles.subtitulo}>Acompanhe as entradas e saídas de um produto.</Text>
        </View>

        <View style={styles.cartao}>
          <Text style={styles.secao}>Cadastro do produto</Text>
          <Text style={styles.rotulo}>Nome do produto</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Ex.: Caderno"
            placeholderTextColor="#8c9aad"
            value={nome}
            onChangeText={valor => alterarCadastro('nome', valor)}
          />

          <Text style={[styles.rotulo, styles.espaco]}>Quantidade inicial</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Ex.: 20"
            placeholderTextColor="#8c9aad"
            keyboardType="number-pad"
            value={quantidadeInicial}
            onChangeText={valor => alterarCadastro('quantidade', valor)}
          />

          <Pressable
            onPress={iniciarEstoque}
            style={({ pressed }) => [styles.botaoCadastro, pressed && styles.pressionado]}
          >
            <Text style={styles.textoBotao}>Registrar estoque inicial</Text>
          </Pressable>
        </View>

        {estoque !== null && (
          <View style={styles.cartao}>
            <Text style={styles.secao}>Estoque disponível</Text>
            <Text style={styles.nomeProduto}>{produto}</Text>
            <Text style={styles.numero}>{estoque}</Text>
            <Text style={styles.unidades}>unidade(s)</Text>

            {estoque < 5 && (
              <View style={styles.alerta}>
                <Text style={styles.textoAlerta}>
                  ⚠️ Estoque baixo! Restam menos de 5 unidades.
                </Text>
              </View>
            )}

            <View style={styles.divisor} />
            <Text style={styles.rotulo}>Quantidade da movimentação</Text>
            <TextInput
              style={styles.entrada}
              placeholder="Ex.: 7"
              placeholderTextColor="#8c9aad"
              keyboardType="number-pad"
              value={movimentacao}
              onChangeText={valor => { setMovimentacao(valor); setMensagem(''); }}
            />

            <View style={styles.linhaBotoes}>
              <Pressable
                style={({ pressed }) => [styles.botaoAcao, styles.botaoAdicionar, pressed && styles.pressionado]}
                onPress={() => movimentar('adicionar')}
              >
                <Text style={styles.textoBotao}>+ Adicionar estoque</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [styles.botaoAcao, styles.botaoRetirar, pressed && styles.pressionado]}
                onPress={() => movimentar('retirar')}
              >
                <Text style={styles.textoBotao}>− Retirar estoque</Text>
              </Pressable>
            </View>
          </View>
        )}

        {mensagem !== '' && (
          <View style={[styles.mensagem, tipoMensagem === 'erro' ? styles.fundoErro : styles.fundoSucesso]}>
            <Text style={tipoMensagem === 'erro' ? styles.textoErro : styles.textoSucesso}>
              {mensagem}
            </Text>
          </View>
        )}

        <Text style={styles.rodape}>As quantidades devem ser números inteiros. O alerta aparece quando o estoque fica abaixo de 5 unidades.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#f1f6ff' },
  conteudo: { flexGrow: 1, padding: 22, paddingVertical: 35 },
  cabecalho: { alignItems: 'center', marginBottom: 23 },
  icone: { fontSize: 49, marginBottom: 8 },
  titulo: { fontSize: 28, fontWeight: '800', color: '#193b63', textAlign: 'center' },
  subtitulo: { fontSize: 14, lineHeight: 21, color: '#64788e', textAlign: 'center', marginTop: 8 },
  cartao: { backgroundColor: '#fff', borderRadius: 18, padding: 20, marginBottom: 16, elevation: 2, shadowColor: '#1a3d64', shadowOpacity: 0.07, shadowRadius: 10 },
  secao: { fontSize: 18, fontWeight: '800', color: '#244c76', marginBottom: 18 },
  rotulo: { fontSize: 14, fontWeight: '700', color: '#35516e', marginBottom: 8 },
  espaco: { marginTop: 17 },
  entrada: { borderWidth: 1.5, borderColor: '#d4e0ed', borderRadius: 11, paddingHorizontal: 14, paddingVertical: 12, backgroundColor: '#fafcff', fontSize: 17, color: '#193b63' },
  botaoCadastro: { marginTop: 20, backgroundColor: '#326bd0', paddingVertical: 15, borderRadius: 11, alignItems: 'center' },
  pressionado: { opacity: 0.78 },
  textoBotao: { color: '#fff', fontSize: 14, fontWeight: '800', textAlign: 'center' },
  nomeProduto: { fontSize: 17, fontWeight: '700', color: '#45617d', textAlign: 'center' },
  numero: { fontSize: 52, fontWeight: '900', color: '#193b63', textAlign: 'center', marginTop: 4 },
  unidades: { fontSize: 14, color: '#64788e', textAlign: 'center' },
  alerta: { marginTop: 17, padding: 13, backgroundColor: '#fff2d7', borderRadius: 10 },
  textoAlerta: { color: '#9c5800', fontSize: 13, fontWeight: '700', textAlign: 'center' },
  divisor: { height: 1, backgroundColor: '#e4ebf4', marginVertical: 20 },
  linhaBotoes: { flexDirection: 'row', gap: 10, marginTop: 17 },
  botaoAcao: { flex: 1, borderRadius: 11, paddingVertical: 14, paddingHorizontal: 7, justifyContent: 'center', alignItems: 'center', minHeight: 55 },
  botaoAdicionar: { backgroundColor: '#16835c' },
  botaoRetirar: { backgroundColor: '#c84d55' },
  mensagem: { borderRadius: 11, padding: 14, marginBottom: 14 },
  fundoErro: { backgroundColor: '#ffe8e8' },
  fundoSucesso: { backgroundColor: '#e5f7ec' },
  textoErro: { color: '#a42a36', fontSize: 14, fontWeight: '600' },
  textoSucesso: { color: '#17683d', fontSize: 14, fontWeight: '600' },
  rodape: { textAlign: 'center', color: '#73859a', fontSize: 12, lineHeight: 18, marginTop: 5 }
});
