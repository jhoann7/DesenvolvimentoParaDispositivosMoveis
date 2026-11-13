# Questão 5 — Simulador de conta bancária 🏦

Aplicativo **mobile** independente, desenvolvido em **React Native com Expo**, para simular depósitos e saques em uma conta com saldo inicial de **R$ 1.000,00**.

## Enunciado
Receber um valor e permitir as ações **Depositar** e **Sacar**, atualizando o saldo e bloqueando saques superiores ao disponível ou operações com valores não positivos.

**Exemplo:** R$ 1.000,00 + R$ 200,00 − R$ 150,00 → **R$ 1.050,00**.

## Funcionalidades
- Saldo inicial fixo de R$ 1.000,00;
- Campo para valor da movimentação;
- Botões **Depositar** e **Sacar**;
- Atualização imediata do saldo;
- Bloqueio de saques superiores ao saldo;
- Validação de campo vazio, zero, números negativos e entradas inválidas;
- Aceita vírgula ou ponto como separador decimal, com até duas casas;
- Mensagens de confirmação e erro;
- Interface adaptada para celular.

## Tecnologias
React Native, Expo, JavaScript, `View`, `Text`, `TextInput`, `Pressable`, `StyleSheet` e `useState`.

## Capturas de tela

### 1. Tela inicial
Captura exibindo o saldo inicial de **R$ 1.000,00**.

![Tela inicial — adicionar captura](capturas/teste1.jpeg)

### 2. Depósito realizado
Captura após depositar **R$ 200,00**, exibindo saldo de **R$ 1.200,00**.

![Depósito realizado — adicionar captura](capturas/teste2.jpeg)

### 3. Saque realizado
Captura após sacar **R$ 150,00**, exibindo saldo de **R$ 1.050,00**.

![Saque realizado — adicionar captura](capturas/teste3.jpeg)

### 4. Saque superior ao saldo
Captura com mensagem de erro ao tentar sacar um valor superior ao saldo disponível.

![Saque inválido — adicionar captura](capturas/teste4.jpeg)
