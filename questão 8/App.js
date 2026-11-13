import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text, TextInput,
  Pressable, StyleSheet, StatusBar, Alert
} from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');
  const [estudantes, setEstudantes] = useState([]);
  const [busca, setBusca] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);

  function cadastrar() {
    const novo = {
      nome: nome.trim(),
      matricula: matricula.trim(),
      email: email.trim(),
      curso: curso.trim()
    };

    if (!novo.nome || !novo.matricula || !novo.email || !novo.curso) {
      setErro(true);
      setMensagem('Preencha todos os campos obrigatórios.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novo.email)) {
      setErro(true);
      setMensagem('Informe um e-mail válido.');
      return;
    }

    if (estudantes.some(item => item.matricula === novo.matricula)) {
      setErro(true);
      setMensagem('Esta matrícula já está cadastrada.');
      return;
    }

    setEstudantes(anteriores => [...anteriores, novo]);
    setNome('');
    setMatricula('');
    setEmail('');
    setCurso('');
    setErro(false);
    setMensagem('Estudante cadastrado com sucesso!');
  }

  function remover(matriculaSelecionada) {
    Alert.alert(
      'Remover estudante',
      'Deseja realmente excluir este cadastro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setEstudantes(anteriores =>
              anteriores.filter(item => item.matricula !== matriculaSelecionada)
            );
            setErro(false);
            setMensagem('Cadastro removido com sucesso.');
          }
        }
      ]
    );
  }

  const termo = busca.trim().toLowerCase();
  const filtrados = estudantes.filter(item =>
    item.nome.toLowerCase().includes(termo) ||
    item.matricula.toLowerCase().includes(termo) ||
    item.email.toLowerCase().includes(termo) ||
    item.curso.toLowerCase().includes(termo)
  );

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f6ff" />
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.cabecalho}>
          <Text style={styles.icone}>🎓</Text>
          <Text style={styles.titulo}>Cadastro de estudantes</Text>
          <Text style={styles.subtitulo}>
            Cadastre, consulte e remova registros acadêmicos.
          </Text>
        </View>

        <View style={styles.cartao}>
          <Text style={styles.secao}>Novo estudante</Text>

          <Text style={styles.rotulo}>Nome completo *</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Ex.: Maria Silva"
            placeholderTextColor="#91a0b2"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.rotulo}>Matrícula *</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Ex.: 20260001"
            placeholderTextColor="#91a0b2"
            value={matricula}
            onChangeText={setMatricula}
            autoCapitalize="none"
          />

          <Text style={styles.rotulo}>E-mail *</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Ex.: maria@exemplo.com"
            placeholderTextColor="#91a0b2"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.rotulo}>Curso *</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Ex.: Licenciatura em Computação"
            placeholderTextColor="#91a0b2"
            value={curso}
            onChangeText={setCurso}
          />

          {mensagem !== '' && (
            <Text style={erro ? styles.erro : styles.sucesso}>
              {mensagem}
            </Text>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.botao,
              pressed && styles.pressionado
            ]}
            onPress={cadastrar}
          >
            <Text style={styles.textoBotao}>Cadastrar estudante</Text>
          </Pressable>
        </View>

        <View style={styles.cabecalhoLista}>
          <Text style={styles.secao}>Estudantes cadastrados</Text>
          <Text style={styles.contador}>{estudantes.length}</Text>
        </View>

        <TextInput
          style={[styles.entrada, styles.busca]}
          placeholder="Buscar por nome, matrícula, e-mail ou curso"
          placeholderTextColor="#91a0b2"
          value={busca}
          onChangeText={setBusca}
        />

        {filtrados.length === 0 ? (
          <View style={styles.vazio}>
            <Text style={styles.textoVazio}>
              {estudantes.length === 0
                ? 'Nenhum estudante cadastrado ainda.'
                : 'Nenhum estudante encontrado.'}
            </Text>
          </View>
        ) : (
          filtrados.map(item => (
            <View key={item.matricula} style={styles.cardEstudante}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.dado}>Matrícula: {item.matricula}</Text>
              <Text style={styles.dado}>E-mail: {item.email}</Text>
              <Text style={styles.dado}>Curso: {item.curso}</Text>

              <Pressable
                onPress={() => remover(item.matricula)}
                style={({ pressed }) => [
                  styles.botaoRemover,
                  pressed && styles.pressionado
                ]}
              >
                <Text style={styles.textoRemover}>Remover cadastro</Text>
              </Pressable>
            </View>
          ))
        )}

        <Text style={styles.rodape}>
          Dados mantidos apenas enquanto o aplicativo estiver aberto.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#f1f6ff' },
  conteudo: { padding: 20, paddingVertical: 34 },
  cabecalho: { alignItems: 'center', marginBottom: 22 },
  icone: { fontSize: 48, marginBottom: 8 },
  titulo: { fontSize: 27, fontWeight: '800', color: '#1e3e67', textAlign: 'center' },
  subtitulo: { fontSize: 14, color: '#637b94', textAlign: 'center', lineHeight: 21, marginTop: 8 },
  cartao: { backgroundColor: '#fff', borderRadius: 18, padding: 20, elevation: 2, shadowColor: '#173b61', shadowOpacity: 0.07, shadowRadius: 9 },
  secao: { fontSize: 19, fontWeight: '800', color: '#24496f' },
  rotulo: { fontSize: 14, fontWeight: '700', color: '#345472', marginTop: 16, marginBottom: 7 },
  entrada: { borderWidth: 1.5, borderColor: '#d4e0ed', borderRadius: 11, paddingHorizontal: 14, paddingVertical: 12, backgroundColor: '#fafcff', fontSize: 15, color: '#1e3e67' },
  botao: { backgroundColor: '#2869cf', borderRadius: 11, paddingVertical: 15, alignItems: 'center', marginTop: 22 },
  pressionado: { opacity: 0.75 },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: '800' },
  erro: { color: '#b62c3d', marginTop: 14, fontSize: 14 },
  sucesso: { color: '#188451', marginTop: 14, fontSize: 14, fontWeight: '600' },
  cabecalhoLista: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 28, marginBottom: 13 },
  contador: { backgroundColor: '#dceaff', color: '#2564c5', fontSize: 16, fontWeight: '800', paddingHorizontal: 13, paddingVertical: 5, borderRadius: 20 },
  busca: { marginBottom: 14, backgroundColor: '#fff' },
  vazio: { padding: 24, borderRadius: 13, backgroundColor: '#fff', alignItems: 'center' },
  textoVazio: { color: '#7a8da2', textAlign: 'center' },
  cardEstudante: { backgroundColor: '#fff', borderRadius: 15, padding: 18, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#2869cf' },
  nome: { fontSize: 18, fontWeight: '800', color: '#24496f', marginBottom: 10 },
  dado: { fontSize: 14, color: '#526c84', lineHeight: 23 },
  botaoRemover: { borderWidth: 1, borderColor: '#e7a7ad', backgroundColor: '#fff1f2', borderRadius: 10, paddingVertical: 11, alignItems: 'center', marginTop: 15 },
  textoRemover: { color: '#b72e3f', fontSize: 14, fontWeight: '800' },
  rodape: { color: '#75879c', fontSize: 12, textAlign: 'center', lineHeight: 19, marginTop: 16 }
});
