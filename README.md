# Desenvolvimento para Dispositivos Móveis 📱

Repositório de atividades práticas da disciplina **Desenvolvimento para Dispositivos Móveis**, com **nove aplicativos independentes** desenvolvidos em **React Native**, **JavaScript** e **Expo Snack**.

Cada exercício possui seu próprio código-fonte e documentação, permitindo executar e testar as aplicações separadamente.

## 📚 Lista de exercícios

| Questão | Aplicativo | Descrição | Acessar |
|:---:|---|---|---|
| 1 | Consumo diário de água | Estima a ingestão diária de água usando 35 mL por quilograma de peso. | [Questão 1](quest%C3%A3o%201/) |
| 2 | Média de estudantes | Calcula a média de três notas e informa aprovação ou reprovação. | [Questão 2](quest%C3%A3o%202/) |
| 3 | Controle de estoque | Registra entradas e saídas de produtos, com validação do estoque disponível. | [Questão 3](quest%C3%A3o%203/) |
| 4 | Conversor de temperatura | Converte valores entre Celsius e Fahrenheit. | [Questão 4](quest%C3%A3o%204/) |
| 5 | Conta bancária | Simula depósitos e saques com saldo inicial de R$ 1.000,00. | [Questão 5](quest%C3%A3o%205/) |
| 6 | Simulador de votação | Registra votos para três candidatos e identifica liderança ou empate. | [Questão 6](quest%C3%A3o%206/) |
| 7 | Calculadora de desconto | Calcula a economia e o preço final após desconto percentual. | [Questão 7](quest%C3%A3o%207/) |
| 8 | Cadastro de estudantes | Cadastra, consulta, pesquisa e remove estudantes, impedindo matrículas duplicadas. | [Questão 8](quest%C3%A3o%208/) |
| 9 | Montagem de pedidos | Seleciona produtos e quantidades, calcula subtotais e total e apresenta o resumo do pedido. | [Questão 9](quest%C3%A3o%209/) |

## 🛠️ Tecnologias utilizadas

- **React Native** — desenvolvimento das interfaces móveis;
- **Expo Snack** — execução dos projetos sem configuração local;
- **JavaScript** — implementação das regras de negócio;
- **React Hooks (`useState`)** — gerenciamento do estado das aplicações;
- **StyleSheet** — estilização dos componentes.

Entre os componentes utilizados estão `View`, `Text`, `TextInput`, `Pressable` e `ScrollView`.

## ▶️ Como executar

1. Acesse [Expo Snack](https://snack.expo.dev/).
2. Abra a pasta da questão desejada neste repositório.
3. Copie o conteúdo do arquivo `App.js`.
4. Cole o código no arquivo `App.js` do Expo Snack, substituindo o exemplo inicial.
5. Execute no ambiente de visualização do Snack ou utilize o aplicativo **Expo Go** para testar no celular.

> **Importante:** cada questão é um projeto independente. Não é necessário copiar arquivos de outras questões nem instalar dependências adicionais para os exemplos apresentados.

## 📁 Organização do repositório

```text
DesenvolvimentoParaDispositivosMoveis/
├── README.md
├── questão 1/
│   ├── App.js
│   └── README.md
├── questão 2/
│   ├── App.js
│   ├── README.md
│   └── capturas/
├── ...
└── questão 9/
    ├── App.js
    ├── README.md
    └── capturas/
```

Cada pasta contém:
- **`App.js`** — código completo do aplicativo;
- **`README.md`** — enunciado, funcionalidades e orientações específicas;
- **`capturas/`** — quando presente, espaço para as capturas de tela dos testes no celular.

As capturas de tela são adicionadas separadamente após a execução dos aplicativos.

## 🧪 Testes

Os arquivos `README.md` de cada questão apresentam exemplos e situações para validação das funcionalidades. Os testes devem ser executados no **Expo Snack** ou no **Expo Go**, verificando os resultados e as mensagens de validação.
