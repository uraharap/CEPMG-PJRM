# Dados de Exemplo para Teste

## Para testar o sistema, adicione estes dados na aba "Base de Dados":

### Configuração da Aba "Configurações"
```
A1: Limite por Pasta    B1: 100
A2: Total de Pessoas    B2: =COUNTA('Base de Dados'!B:B)-1  
A3: Próximo ID         B3: =MAX('Base de Dados'!A:A)+1
```

### Dados de Exemplo na Aba "Base de Dados"
```
A1: ID    B1: Nome                C1: Pasta    D1: Data Inclusão    E1: Letra    F1: Numero Pasta
2: 1      Ana Silva              A1           2024-01-15           A            1
3: 2      Bruno Santos           B1           2024-01-16           B            1
4: 3      Carlos Oliveira        C1           2024-01-17           C            1
5: 4      Daniela Costa          D1           2024-01-18           D            1
6: 5      Eduardo Ferreira       E1           2024-01-19           E            1
7: 6      Fernanda Lima          F1           2024-01-20           F            1
8: 7      Gabriel Rocha          G1           2024-01-21           G            1
9: 8      Helena Martins         H1           2024-01-22           H            1
10: 9     Igor Mendes            I1           2024-01-23           I            1
11: 10    Julia Alves            J1           2024-01-24           J            1
```

## Como Funciona o Sistema

### 1. Inserção Automática
- Digite um nome no campo B4
- Clique em "Inserir Nome"  
- O sistema automaticamente:
  - Pega a primeira letra do nome
  - Verifica qual pasta da letra tem menos pessoas
  - Se todas as pastas da letra tiverem 100+ pessoas, cria uma nova (A2, A3, etc.)
  - Atribui um ID único
  - Registra a data atual

### 2. Busca Inteligente
- Digite parte do nome no campo B7
- Clique em "Buscar"
- O sistema mostra todos os nomes que contêm o termo buscado
- Exibe ID, nome completo, pasta e data de inclusão

### 3. Edição e Exclusão
- Use "Editar Registro" informando o ID
- Use "Excluir Registro" informando o ID
- Ambas operações têm confirmação de segurança

### 4. Relatórios
- "Listar Todos": Mostra todos os registros
- "Relatório": Estatísticas por letra e percentuais
- Contadores automáticos no topo da tela

### 5. Backup
- "Exportar": Salva uma cópia dos dados em arquivo Excel separado
- Inclui data no nome do arquivo automaticamente

## Características Técnicas

### Limite por Pasta: 100 pessoas
- Quando uma pasta atinge 100 pessoas, o sistema cria automaticamente a próxima
- Exemplo: A1 → A2 → A3...

### Validação de Dados:
- Não permite nomes duplicados
- Não permite nomes vazios
- IDs são únicos e sequenciais

### Tratamento de Erros:
- Mensagens claras para o usuário
- Validação antes de executar operações
- Confirmação para exclusões

### Performance:
- Otimizado para milhares de registros
- Busca rápida por aproximação
- Contadores automáticos eficientes

## Dicas de Uso

1. **Backup Regular**: Use a função "Exportar" semanalmente
2. **Organização**: Os nomes são automaticamente organizados por letra
3. **Busca**: Use termos parciais (ex: "Silva" encontra "Ana Silva")
4. **Manutenção**: Use "Limpar Campos" para resetar a interface
5. **Relatórios**: Use "Relatório" para análises estatísticas

## Solução de Problemas

### Se algo não funcionar:
1. Verifique se as macros estão habilitadas
2. Confirme se as abas têm os nomes corretos
3. Execute "InicializarSistema" uma vez
4. Verifique se os cabeçalhos estão na linha 1

### Para restaurar dados:
- Mantenha sempre um backup atualizado
- Em caso de problemas, importe do último backup válido