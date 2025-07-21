' ====================================================
' SISTEMA DE ARQUIVO MORTO ESCOLAR - MÓDULO PRINCIPAL
' ====================================================

Option Explicit

' Declaração de constantes
Const ABA_DADOS As String = "Base de Dados"
Const ABA_PAINEL As String = "Painel Principal"
Const ABA_CONFIG As String = "Configurações"
Const LIMITE_PASTA As Integer = 100

' ====================================================
' FUNÇÃO PRINCIPAL - INSERIR NOVO NOME
' ====================================================
Sub InserirNovoNome()
    Dim nome As String
    Dim ws_dados As Worksheet
    Dim ws_config As Worksheet
    Dim ultima_linha As Long
    Dim novo_id As Long
    Dim letra_nome As String
    Dim pasta_destino As String
    Dim data_atual As Date
    
    On Error GoTo TratarErro
    
    ' Obter o nome do campo de entrada
    nome = Trim(Worksheets(ABA_PAINEL).Range("B4").Value)
    
    ' Validar entrada
    If nome = "" Then
        MsgBox "Por favor, digite um nome válido.", vbExclamation, "Entrada Inválida"
        Exit Sub
    End If
    
    ' Verificar se nome já existe
    If NomeJaExiste(nome) Then
        MsgBox "Este nome já está cadastrado no sistema.", vbExclamation, "Nome Duplicado"
        Exit Sub
    End If
    
    ' Configurar planilhas
    Set ws_dados = Worksheets(ABA_DADOS)
    Set ws_config = Worksheets(ABA_CONFIG)
    
    ' Obter próximo ID
    nova_id = ws_config.Range("B3").Value
    
    ' Obter primeira letra do nome
    letra_nome = UCase(Left(nome, 1))
    
    ' Determinar pasta de destino
    pasta_destino = DeterminarPastaDestino(letra_nome)
    
    ' Inserir dados na base
    ultima_linha = ws_dados.Cells(ws_dados.Rows.Count, "A").End(xlUp).Row + 1
    
    With ws_dados
        .Cells(ultima_linha, 1).Value = novo_id ' ID
        .Cells(ultima_linha, 2).Value = nome ' Nome
        .Cells(ultima_linha, 3).Value = pasta_destino ' Pasta
        .Cells(ultima_linha, 4).Value = Date ' Data Inclusão
        .Cells(ultima_linha, 5).Value = letra_nome ' Letra
        .Cells(ultima_linha, 6).Value = ExtrairNumeroPasta(pasta_destino) ' Número da Pasta
    End With
    
    ' Limpar campo de entrada
    Worksheets(ABA_PAINEL).Range("B4").ClearContents
    
    ' Atualizar contadores
    AtualizarContadores
    
    ' Mensagem de sucesso
    MsgBox "Nome '" & nome & "' inserido com sucesso na pasta " & pasta_destino & "!", vbInformation, "Sucesso"
    
    Exit Sub

TratarErro:
    MsgBox "Erro ao inserir nome: " & Err.Description, vbCritical, "Erro"
End Sub

' ====================================================
' FUNÇÃO PARA DETERMINAR PASTA DE DESTINO
' ====================================================
Function DeterminarPastaDestino(letra As String) As String
    Dim ws_dados As Worksheet
    Dim ultima_linha As Long
    Dim i As Long
    Dim contador_pasta As Integer
    Dim numero_pasta As Integer
    Dim pasta_atual As String
    
    Set ws_dados = Worksheets(ABA_DADOS)
    ultima_linha = ws_dados.Cells(ws_dados.Rows.Count, "A").End(xlUp).Row
    
    numero_pasta = 1
    
    Do
        pasta_atual = letra & numero_pasta
        contador_pasta = 0
        
        ' Contar quantas pessoas já estão nesta pasta
        For i = 2 To ultima_linha
            If ws_dados.Cells(i, 3).Value = pasta_atual Then
                contador_pasta = contador_pasta + 1
            End If
        Next i
        
        ' Se a pasta tem menos que o limite, usar esta pasta
        If contador_pasta < LIMITE_PASTA Then
            DeterminarPastaDestino = pasta_atual
            Exit Function
        End If
        
        ' Caso contrário, tentar próximo número
        numero_pasta = numero_pasta + 1
        
    Loop While numero_pasta <= 999 ' Limite de segurança
    
    ' Se chegou aqui, retornar erro
    DeterminarPastaDestino = "ERRO"
End Function

' ====================================================
' FUNÇÃO PARA BUSCAR NOMES
' ====================================================
Sub BuscarNome()
    Dim termo_busca As String
    Dim ws_dados As Worksheet
    Dim ws_painel As Worksheet
    Dim ultima_linha As Long
    Dim i As Long
    Dim resultados As String
    Dim contador_resultados As Integer
    
    On Error GoTo TratarErro
    
    ' Obter termo de busca
    Set ws_painel = Worksheets(ABA_PAINEL)
    termo_busca = Trim(ws_painel.Range("B7").Value)
    
    If termo_busca = "" Then
        MsgBox "Digite um nome para buscar.", vbExclamation, "Busca Inválida"
        Exit Sub
    End If
    
    Set ws_dados = Worksheets(ABA_DADOS)
    ultima_linha = ws_dados.Cells(ws_dados.Rows.Count, "A").End(xlUp).Row
    
    resultados = "RESULTADOS DA BUSCA:" & vbCrLf & vbCrLf
    contador_resultados = 0
    
    ' Buscar nos dados
    For i = 2 To ultima_linha
        If InStr(1, UCase(ws_dados.Cells(i, 2).Value), UCase(termo_busca)) > 0 Then
            contador_resultados = contador_resultados + 1
            resultados = resultados & "ID: " & ws_dados.Cells(i, 1).Value & vbCrLf
            resultados = resultados & "Nome: " & ws_dados.Cells(i, 2).Value & vbCrLf
            resultados = resultados & "Pasta: " & ws_dados.Cells(i, 3).Value & vbCrLf
            resultados = resultados & "Data: " & ws_dados.Cells(i, 4).Value & vbCrLf & vbCrLf
        End If
    Next i
    
    If contador_resultados = 0 Then
        resultados = "Nenhum resultado encontrado para '" & termo_busca & "'."
    Else
        resultados = "Encontrados " & contador_resultados & " resultado(s):" & vbCrLf & vbCrLf & resultados
    End If
    
    ' Exibir resultados
    ws_painel.Range("A10:F20").ClearContents
    ws_painel.Range("A10").Value = resultados
    
    Exit Sub

TratarErro:
    MsgBox "Erro na busca: " & Err.Description, vbCritical, "Erro"
End Sub

' ====================================================
' FUNÇÃO PARA EDITAR REGISTRO
' ====================================================
Sub EditarRegistro()
    Dim id_busca As String
    Dim ws_dados As Worksheet
    Dim ultima_linha As Long
    Dim i As Long
    Dim linha_encontrada As Long
    Dim novo_nome As String
    
    On Error GoTo TratarErro
    
    ' Obter ID para editar
    id_busca = InputBox("Digite o ID do registro que deseja editar:", "Editar Registro")
    
    If id_busca = "" Then Exit Sub
    
    Set ws_dados = Worksheets(ABA_DADOS)
    ultima_linha = ws_dados.Cells(ws_dados.Rows.Count, "A").End(xlUp).Row
    linha_encontrada = 0
    
    ' Buscar o ID
    For i = 2 To ultima_linha
        If ws_dados.Cells(i, 1).Value = CLng(id_busca) Then
            linha_encontrada = i
            Exit For
        End If
    Next i
    
    If linha_encontrada = 0 Then
        MsgBox "ID não encontrado.", vbExclamation, "Erro"
        Exit Sub
    End If
    
    ' Mostrar dados atuais e pedir novo nome
    novo_nome = InputBox("Nome atual: " & ws_dados.Cells(linha_encontrada, 2).Value & vbCrLf & vbCrLf & "Digite o novo nome:", "Editar Nome")
    
    If novo_nome = "" Then Exit Sub
    
    ' Atualizar dados
    ws_dados.Cells(linha_encontrada, 2).Value = novo_nome
    
    ' Recalcular pasta se necessário
    Dim nova_letra As String
    nova_letra = UCase(Left(novo_nome, 1))
    
    If nova_letra <> ws_dados.Cells(linha_encontrada, 5).Value Then
        ws_dados.Cells(linha_encontrada, 5).Value = nova_letra
        ws_dados.Cells(linha_encontrada, 3).Value = DeterminarPastaDestino(nova_letra)
    End If
    
    MsgBox "Registro atualizado com sucesso!", vbInformation, "Sucesso"
    
    Exit Sub

TratarErro:
    MsgBox "Erro ao editar: " & Err.Description, vbCritical, "Erro"
End Sub

' ====================================================
' FUNÇÃO PARA EXCLUIR REGISTRO
' ====================================================
Sub ExcluirRegistro()
    Dim id_busca As String
    Dim ws_dados As Worksheet
    Dim ultima_linha As Long
    Dim i As Long
    Dim linha_encontrada As Long
    Dim confirmacao As VbMsgBoxResult
    
    On Error GoTo TratarErro
    
    ' Obter ID para excluir
    id_busca = InputBox("Digite o ID do registro que deseja excluir:", "Excluir Registro")
    
    If id_busca = "" Then Exit Sub
    
    Set ws_dados = Worksheets(ABA_DADOS)
    ultima_linha = ws_dados.Cells(ws_dados.Rows.Count, "A").End(xlUp).Row
    linha_encontrada = 0
    
    ' Buscar o ID
    For i = 2 To ultima_linha
        If ws_dados.Cells(i, 1).Value = CLng(id_busca) Then
            linha_encontrada = i
            Exit For
        End If
    Next i
    
    If linha_encontrada = 0 Then
        MsgBox "ID não encontrado.", vbExclamation, "Erro"
        Exit Sub
    End If
    
    ' Confirmar exclusão
    confirmacao = MsgBox("Tem certeza que deseja excluir:" & vbCrLf & vbCrLf & "ID: " & ws_dados.Cells(linha_encontrada, 1).Value & vbCrLf & "Nome: " & ws_dados.Cells(linha_encontrada, 2).Value & vbCrLf & "Pasta: " & ws_dados.Cells(linha_encontrada, 3).Value, vbYesNo + vbQuestion, "Confirmar Exclusão")
    
    If confirmacao = vbYes Then
        ' Excluir linha
        ws_dados.Rows(linha_encontrada).Delete
        
        ' Atualizar contadores
        AtualizarContadores
        
        MsgBox "Registro excluído com sucesso!", vbInformation, "Sucesso"
    End If
    
    Exit Sub

TratarErro:
    MsgBox "Erro ao excluir: " & Err.Description, vbCritical, "Erro"
End Sub

' ====================================================
' FUNÇÃO PARA EXPORTAR DADOS
' ====================================================
Sub ExportarDados()
    Dim caminho_arquivo As String
    Dim ws_dados As Worksheet
    
    On Error GoTo TratarErro
    
    ' Solicitar local para salvar
    caminho_arquivo = Application.GetSaveAsFilename(InitialFileName:="backup-arquivo-morto-" & Format(Date, "yyyy-mm-dd") & ".xlsx", FileFilter:="Excel Files (*.xlsx), *.xlsx")
    
    If caminho_arquivo <> "False" Then
        Set ws_dados = Worksheets(ABA_DADOS)
        
        ' Criar nova pasta de trabalho
        Dim wb_backup As Workbook
        Set wb_backup = Workbooks.Add
        
        ' Copiar dados
        ws_dados.Copy Before:=wb_backup.Sheets(1)
        
        ' Salvar e fechar
        wb_backup.SaveAs caminho_arquivo
        wb_backup.Close
        
        MsgBox "Dados exportados com sucesso para:" & vbCrLf & caminho_arquivo, vbInformation, "Exportação Concluída"
    End If
    
    Exit Sub

TratarErro:
    MsgBox "Erro na exportação: " & Err.Description, vbCritical, "Erro"
End Sub