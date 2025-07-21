# Sistema de Arquivo Morto - Planilha Excel

## Instruções de Implementação

### 1. Criar a Planilha Base

1. Abra o Microsoft Excel
2. Crie uma nova pasta de trabalho
3. Renomeie as abas conforme indicado:
   - **Aba 1**: "Painel Principal"
   - **Aba 2**: "Base de Dados" 
   - **Aba 3**: "Configurações"

### 2. Estrutura das Abas

#### Aba "Base de Dados" (Coluna por coluna):
- **A1**: "ID"
- **B1**: "Nome"
- **C1**: "Pasta"
- **D1**: "Data Inclusão"
- **E1**: "Letra"
- **F1**: "Numero Pasta"

#### Aba "Configurações":
- **A1**: "Limite por Pasta"
- **B1**: 100
- **A2**: "Total de Pessoas"
- **B2**: =COUNTA('Base de Dados'!B:B)-1
- **A3**: "Próximo ID"
- **B3**: =MAX('Base de Dados'!A:A)+1

#### Aba "Painel Principal":
Layout conforme o código VBA que será implementado.

### 3. Habilitar Macros

1. Vá em **Arquivo > Opções > Central de Confiabilidade**
2. Clique em **Configurações da Central de Confiabilidade**
3. Vá em **Configurações de Macro**
4. Selecione **Habilitar todas as macros**

### 4. Implementar o Código VBA

1. Pressione **Alt + F11** para abrir o Editor VBA
2. No menu **Inserir**, clique em **Módulo**
3. Cole o código fornecido no arquivo `modulo-principal.vba`
4. Crie um segundo módulo e cole o código do arquivo `modulo-utilitarios.vba`

### 5. Criar Interface do Painel Principal

Siga as instruções no arquivo `interface-layout.md` para posicionar os controles na aba "Painel Principal".

### 6. Salvar como Pasta de Trabalho Habilitada para Macro

1. **Arquivo > Salvar Como**
2. Escolha **Pasta de Trabalho Habilitada para Macro do Excel (*.xlsm)**
3. Nomeie como "Sistema-Arquivo-Morto.xlsm"

## Funcionalidades Implementadas

✅ Inserção automática de nomes com alocação por letra
✅ Criação automática de pastas (A1, A2, B1, etc.)
✅ Busca eficiente de nomes
✅ Edição e exclusão de registros
✅ Contadores automáticos
✅ Exportação para backup
✅ Interface amigável com botões

## Suporte

Se encontrar dificuldades na implementação, todos os códigos estão comentados e incluem tratamento de erros básico.