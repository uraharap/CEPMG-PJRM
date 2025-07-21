# Layout da Interface - Painel Principal

## Instruções para Criar a Interface

### 1. Configuração da Aba "Painel Principal"

Siga estas instruções para posicionar os elementos na planilha:

#### Linha 1 - Título Principal
- **A1**: Mesclar células A1:F1
- **Conteúdo**: "SISTEMA DE ARQUIVO MORTO ESCOLAR"
- **Formatação**: Fonte grande (18pt), negrito, centralizado

#### Linha 2 - Contadores
- **A2**: "CONTADORES"
- **B2**: =CONCATENATE("Total de Pessoas: ",COUNTA('Base de Dados'!B:B)-1)
- **D2**: "RELATÓRIO POR PASTA:" (será preenchido automaticamente)

#### Linha 3 - Divisória
- **A3:F3**: Formatação com borda inferior

#### Linha 4 - Inserção de Nomes
- **A4**: "INSERIR NOVO NOME:"
- **B4**: (Campo de entrada - deixar vazio)
- **C4**: Botão "Inserir Nome"

#### Linha 5 - Espaço em branco

#### Linha 6 - Busca
- **A6**: "BUSCAR PESSOA:"
- **B7**: (Campo de busca - deixar vazio)
- **C7**: Botão "Buscar"

#### Linha 8 - Botões de Ação
- **A8**: Botão "Editar Registro"
- **B8**: Botão "Excluir Registro"
- **C8**: Botão "Listar Todos"
- **D8**: Botão "Limpar Campos"
- **E8**: Botão "Relatório"
- **F8**: Botão "Exportar"

#### Linha 9 - Divisória
- **A9:F9**: Formatação com borda superior

#### Linhas 10-25 - Área de Resultados
- **A10:F25**: Área reservada para exibir resultados de buscas e relatórios

### 2. Criação dos Botões

Para cada botão, siga estes passos:

1. **Inserir > Formas > Retângulo**
2. Desenhar sobre a célula indicada
3. Clicar com botão direito > **Atribuir Macro**
4. Selecionar a macro correspondente:

#### Mapeamento de Botões e Macros:
- **"Inserir Nome"** → `InserirNovoNome`
- **"Buscar"** → `BuscarNome`
- **"Editar Registro"** → `EditarRegistro`
- **"Excluir Registro"** → `ExcluirRegistro`
- **"Listar Todos"** → `ListarTodasPessoas`
- **"Limpar Campos"** → `LimparCampos`
- **"Relatório"** → `GerarRelatorioEstatistico`
- **"Exportar"** → `ExportarDados`

### 3. Formatação Recomendada

#### Cores e Estilo:
- **Título**: Fundo azul escuro, texto branco
- **Cabeçalhos**: Fundo azul claro, texto preto
- **Botões**: Fundo verde, texto branco, bordas arredondadas
- **Campos de entrada**: Fundo amarelo claro, borda preta
- **Área de resultados**: Fundo cinza claro

#### Fonte:
- **Título**: Arial 18pt, negrito
- **Cabeçalhos**: Arial 12pt, negrito
- **Conteúdo**: Arial 10pt
- **Botões**: Arial 10pt, negrito

### 4. Proteção da Planilha

Após finalizar a interface:

1. Selecione todas as células EXCETO B4 e B7 (campos de entrada)
2. **Início > Formato > Formatar Células > Proteção**
3. Marque "Bloqueada"
4. **Revisão > Proteger Planilha**
5. Defina uma senha (opcional)

### 5. Inicialização Automática

Na aba "Painel Principal", adicione este código VBA no evento de ativação:

```vba
Private Sub Worksheet_Activate()
    AtualizarContadores
End Sub
```

### 6. Validação de Dados

Para melhorar a experiência:

#### Campo B4 (Inserir Nome):
- **Dados > Validação de Dados**
- **Critério**: Texto
- **Comprimento**: Entre 2 e 50 caracteres

#### Campo B7 (Buscar):
- **Dados > Validação de Dados**
- **Critério**: Texto
- **Comprimento**: Entre 1 e 50 caracteres

## Resultado Final

Após seguir todas as instruções, você terá uma interface completa e funcional para gerenciar o arquivo morto escolar, com:

✅ Inserção automática com alocação por letra
✅ Busca eficiente
✅ Edição e exclusão de registros
✅ Relatórios automáticos
✅ Contadores em tempo real
✅ Exportação para backup
✅ Interface amigável e protegida