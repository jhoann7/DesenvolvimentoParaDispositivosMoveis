# Questão 1 — Consumo diário de água 💧

Aplicativo **mobile** independente, desenvolvido em **React Native com Expo**, para estimar didaticamente a quantidade diária de água com base no peso corporal.

## Enunciado
Receber o peso em quilogramas e calcular o consumo diário estimado de água, considerando **35 ml por kg**.

**Fórmula:** `litros = (pesoEmKg * 35) / 1000`

**Exemplo:** 70 kg → **2,45 litros por dia**.

## Funcionalidades
- Campo de peso em kg, com teclado numérico;
- Botão **Calcular**;
- Resultado em litros, com duas casas decimais e vírgula decimal;
- Mensagens de erro para campo vazio, zero, número negativo e entrada inválida;
- Aceita vírgula ou ponto como separador decimal;
- Limpa resultados anteriores quando o peso é alterado;
- Interface adaptada para celular.

## Tecnologias
React Native, Expo, JavaScript, `View`, `Text`, `TextInput`, `Pressable`, `StyleSheet` e `useState`.

## Executar no Expo Snack
1. Acesse https://snack.expo.dev/ e crie um Snack.
2. Substitua o conteúdo de `App.js` pelo código deste diretório.
3. Crie o arquivo `calcularAgua.mjs` no Snack, com o conteúdo do arquivo homônimo deste diretório.
4. Selecione a visualização Android/iOS ou abra o projeto no **Expo Go** pelo QR code exibido no Snack.
5. Informe um peso e pressione **Calcular**.

## Executar localmente
Pré-requisitos: Node.js e aplicativo Expo Go no celular.

```bash
cd "questão 1"
npm install
npx expo start
```

Escaneie o QR code com o Expo Go (Android) ou o recurso indicado pelo Expo no iOS. O computador e o celular normalmente precisam estar na mesma rede; caso necessário, use `npx expo start --tunnel`.

## Testes automatizados

Para executar os testes da fórmula e das validações, use `npm test` dentro de `questão 1` (requer Node.js com suporte ao executor nativo de testes). Os arquivos estão em `tests/`.

## Casos de teste
| Entrada | Resultado esperado |
|---|---|
| `70` | `2,45 litros` |
| `50` | `1,75 litros` |
| `70,5` | `2,47 litros` |
| Campo vazio | `Informe seu peso em quilogramas.` |
| `0` | `Digite um peso válido maior que zero.` |
| `-5` | `Digite um peso válido maior que zero.` |
| `abc` (quando permitido colar) | `Digite um peso válido maior que zero.` |

**Status:** testes automatizados disponíveis; a execução visual em dispositivo real e no Snack deve ser confirmada após abrir o aplicativo.

## Capturas de tela
Após testar no celular, use a pasta `capturas/` já criada neste diretório e adicione:

### 1. Tela inicial
Captura com campo de peso vazio e botão **Calcular**.

![Tela inicial — adicionar captura](capturas/tela-inicial.png)

### 2. Cálculo realizado
Captura com peso **70** e resultado **2,45 litros**.

![Cálculo de 70 kg — adicionar captura](capturas/calculo-70kg.png)

### 3. Validação do campo vazio
Captura após pressionar **Calcular** sem preencher o peso.

![Validação de campo vazio — adicionar captura](capturas/erro-campo-vazio.png)

### 4. Validação de peso inválido
Captura com peso **0** (ou negativo) e a mensagem de erro.

![Validação de peso inválido — adicionar captura](capturas/erro-peso-invalido.png)

> As imagens ainda não foram adicionadas; os caminhos acima são espaços reservados para as capturas reais do celular.

## Observação
A fórmula de 35 ml/kg é usada apenas como estimativa didática e não substitui recomendações individualizadas de saúde.
