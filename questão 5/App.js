import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text, TextInput,
  Pressable, StyleSheet, StatusBar
} from 'react-native';

export default function App() {
  // Valores monetários em centavos para evitar erros de arredondamento.
  const [saldo, setSaldo] = useState(100000);
  const [valor, setValor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('');

  function formatarReais(centavos) {
    return (centavos / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  function interpretarValor(texto) {
    const entrada = texto.trim().replace(',', '.');

    // Aceita números inteiros ou com até duas casas decimais.
    if (!/^\d+(?:\.\d{1,2})?$/.test(entrada)) {
      return null;
    }

    const partes = entrada.split('.');
    const reais = Number(partes[0]);
    const centavos = Number((partes[1] || '').padEnd(2, '0'));
    const total = reais * 100 + centavos;

    if (!Number.isSafeInteger(total) || total <= 0) {
      return null;
    }

    return total;
  }

  function movimentar(tipo) {
    const quantia = interpretarValor(valor);

    if (quantia === null) {
      setTipoMensagem('erro');
      setMensagem('Informe um valor maior que zero, com até duas casas decimais.');
      return;
    }

    if (tipo === 'saque' && quantia > saldo) {
      setTipoMensagem('erro');
      setMensagem('Saldo insuficiente para realizar o saque.');
      return;
    }

    if (tipo === 'deposito' && !Number.isSafeInteger(saldo + quantia)) {
      setTipoMensagem('erro');
      setMensagem('Valor muito alto para realizar a operação.');
      return;
    }

    setSaldo(anterior => tipo === 'deposito'
      ? anterior + quantia
      : anterior - quantia
    );
    setValor('');
    setTipoMensagem('sucesso');
    setMensagem(
      (tipo === 'deposito' ? 'Depósito' : 'Saque') +
      ' de ' + formatarReais(quantia) + ' realizado com sucesso!'
    );
  }

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f6ff" />
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.cabecalho}>
          <Text style={styles.icone}>🏦</Text>
          <Text style={styles.titulo}>Conta bancária</Text>
          <Text style={styles.subtitulo}>
            Simule depósitos e saques em sua conta.
          </Text>
        </View>

        <View style={styles.cartaoSaldo}>
          <Text style={styles.rotuloSaldo}>Saldo disponível</Text>
          <Text style={styles.saldo}>{formatarReais(saldo)}</Text>
          <Text style={styles.observacao}>Saldo inicial: R$ 1.000,00</Text>
        </View>

        <View style={styles.cartao}>
          <Text style={styles.secao}>Nova movimentação</Text>
          <Text style={styles.rotulo}>Valor da operação (R$)</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Ex.: 200,00"
            placeholderTextColor="#8d9db0"
            keyboardType="decimal-pad"
            value={valor}
            onChangeText={texto => {
              setValor(texto);
              setMensagem('');
            }}
          />

          <View style={styles.botoes}>
            <Pressable
              style={({ pressed }) => [
                styles.botao, styles.botaoDepositar,
                pressed && styles.pressionado
              ]}
              onPress={() => movimentar('deposito')}
            >
              <Text style={styles.textoBotao}>+ Depositar</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.botao, styles.botaoSacar,
                pressed && styles.pressionado
              ]}
              onPress={() => movimentar('saque')}
            >
              <Text style={styles.textoBotao}>− Sacar</Text>
            </Pressable>
          </View>

          {mensagem !== '' && (
            <View style={[
              styles.caixaMensagem,
              tipoMensagem === 'erro'
                ? styles.fundoErro
                : styles.fundoSucesso
            ]}>
              <Text style={
                tipoMensagem === 'erro'
                  ? styles.textoErro
                  : styles.textoSucesso
              }>
                {mensagem}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.rodape}>
          Simulação didática. Nenhuma transação bancária real é realizada.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#f1f6ff' },
  conteudo: {
    flexGrow: 1, justifyContent: 'center',
    padding: 22, paddingVertical: 38
  },
  cabecalho: { alignItems: 'center', marginBottom: 24 },
  icone: { fontSize: 51, marginBottom: 8 },
  titulo: {
    fontSize: 29, fontWeight: '800',
    color: '#1d3d66', textAlign: 'center'
  },
  subtitulo: {
    fontSize: 15, color: '#637b94',
    textAlign: 'center', marginTop: 8, lineHeight: 22
  },
  cartaoSaldo: {
    backgroundColor: '#2564c5', borderRadius: 20,
    padding: 25, marginBottom: 18, alignItems: 'center',
    elevation: 3, shadowColor: '#1b3b61',
    shadowOpacity: 0.09, shadowRadius: 12
  },
  rotuloSaldo: { color: '#dceaff', fontSize: 15, fontWeight: '600' },
  saldo: {
    color: '#fff', fontSize: 38,
    fontWeight: '900', marginVertical: 12
  },
  observacao: { color: '#dceaff', fontSize: 12 },
  cartao: {
    backgroundColor: '#fff', borderRadius: 20, padding: 22,
    elevation: 2, shadowColor: '#173b61',
    shadowOpacity: 0.07, shadowRadius: 10
  },
  secao: {
    fontSize: 19, fontWeight: '800',
    color: '#25496f', marginBottom: 21
  },
  rotulo: {
    fontSize: 15, fontWeight: '700',
    color: '#345472', marginBottom: 9
  },
  entrada: {
    borderWidth: 1.5, borderColor: '#d4e0ed',
    borderRadius: 12, paddingHorizontal: 15,
    paddingVertical: 14, backgroundColor: '#fafcff',
    fontSize: 18, color: '#1d3d66'
  },
  botoes: { flexDirection: 'row', gap: 12, marginTop: 22 },
  botao: {
    flex: 1, paddingVertical: 16,
    borderRadius: 12, alignItems: 'center'
  },
  botaoDepositar: { backgroundColor: '#16845d' },
  botaoSacar: { backgroundColor: '#c44a56' },
  pressionado: { opacity: 0.8 },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: '800' },
  caixaMensagem: {
    borderRadius: 11, padding: 14, marginTop: 18
  },
  fundoErro: { backgroundColor: '#ffe9e9' },
  fundoSucesso: { backgroundColor: '#e5f7ed' },
  textoErro: { color: '#aa293a', fontSize: 14, fontWeight: '600' },
  textoSucesso: { color: '#167044', fontSize: 14, fontWeight: '600' },
  rodape: {
    color: '#75879c', fontSize: 12,
    textAlign: 'center', lineHeight: 19, marginTop: 24
  }
});
