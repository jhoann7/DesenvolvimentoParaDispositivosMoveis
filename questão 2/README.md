# Questão 2 — Média aritmética escolar 🎓

Aplicativo **mobile** independente, desenvolvido em **React Native com Expo**, para calcular a média aritmética de três notas de um estudante e indicar sua situação.

## Enunciado
Receber o nome de um estudante e três notas, calcular a média aritmética e indicar se está **Aprovado** (média maior ou igual a 7) ou **Reprovado** (média menor que 7).

**Fórmula:** `média = (nota1 + nota2 + nota3) / 3`

**Exemplo:** 8,0, 7,0 e 9,0 → média **8,0** → **Aprovado**.

## Funcionalidades
- Campo para nome do estudante;
- Três campos de notas, de 0 a 10;
- Botão **Calcular média**;
- Exibição do nome, média com uma casa decimal e situação;
- Validação de nome vazio, notas vazias, valores inválidos e notas fora do intervalo de 0 a 10;
- Aceita vírgula ou ponto como separador decimal;
- Limpa o resultado ao alterar qualquer campo;
- Interface adaptada para celular.

## Tecnologias
React Native, Expo, JavaScript, `View`, `Text`, `TextInput`, `Pressable`, `StyleSheet` e `useState`.

## Capturas de tela

### 1. Tela inicial
Captura com os campos vazios e botão **Calcular média**.

![Tela inicial — adicionar captura](capturas/teste1.jpeg)

### 2. Estudante aprovado
Captura com nome preenchido, exibindo média e **Aprovado**.

![Estudante aprovado — adicionar captura](capturas/teste2.jpeg)

### 3. Estudante reprovado
Captura exibindo média e **Reprovado**.

![Estudante reprovado — adicionar captura](capturas/teste3.jpeg)

### 4. Validação de nota inválida
Captura com nota **11** e mensagem de erro.

![Validação de nota inválida — adicionar captura](capturas/teste4.jpeg)
