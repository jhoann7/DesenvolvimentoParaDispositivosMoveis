# Questão 6 — Simulador de votação 🗳️

Aplicativo **mobile** independente, desenvolvido em **React Native com Expo**, para registrar e contabilizar votos em três candidatos fictícios.

## Enunciado
Exibir três candidatos com nome e botão de votação, mostrar a quantidade de votos de cada um, o total geral e identificar o mais votado ou um empate na liderança.

**Exemplo:** 10 votos para Ana Silva, 15 para Bruno Costa e 8 para Carla Souza → **Bruno Costa é o mais votado**, com 15 votos. Total geral: **33 votos**.

## Funcionalidades
- Três candidatos fictícios: **Ana Silva**, **Bruno Costa** e **Carla Souza**;
- Botão individual para registrar um voto em cada candidato;
- Atualização imediata dos votos por candidato;
- Exibição do total geral de votos;
- Identificação automática do candidato mais votado;
- Indicação de empate na liderança, inclusive entre os três candidatos;
- Mensagem inicial quando ainda não existem votos;
- Interface adaptada para celular.

## Tecnologias
React Native, Expo, JavaScript, `View`, `Text`, `Pressable`, `StyleSheet` e `useState`.

## Capturas de tela

### 1. Tela inicial
Captura mostrando os três candidatos com **0 votos** e total geral **0**.

![Tela inicial — adicionar captura](capturas/teste1.jpeg)

### 2. Votos registrados
Captura após registrar votos, mostrando os contadores individuais e o total geral.

![Votos registrados — adicionar captura](capturas/teste2.jpeg)

### 3. Empate na liderança
Captura com empate entre dois ou três candidatos na maior votação.

![Empate na liderança — adicionar captura](capturas/teste3.jpeg)
