' ====================================================
' SISTEMA DE ARQUIVO MORTO - MÓDULO UTILITÁRIOS
' ====================================================

Option Explicit

' ====================================================
' FUNÇÃO PARA VERIFICAR SE NOME JÁ EXISTE
' ====================================================
Function NomeJaExiste(nome As String) As Boolean
    Dim ws_dados As Worksheet
    Dim ultima_linha As Long
    Dim i As Long
    
    Set ws_dados = Worksheets(ABA_DADOS)
    ultima_linha = ws_dados.Cells(ws_dados.Rows.Count, "A").End(xlUp).Row
    
    NomeJaExiste = False
    
    For i = 2 To ultima_linha
        If UCase(Trim(ws_dados.Cells(i, 2).Value)) = UCase(Trim(nome)) Then
            NomeJaExiste = True
            Exit Function
        End If
    Next i
End Function

' ====================================================
' FUNÇÃO PARA EXTRAIR NÚMERO DA PASTA
' ====================================================
Function ExtrairNumeroPasta(pasta As String) As Integer
    Dim i As Integer
    Dim numero_str As String
    
    ' Remover a primeira letra e converter o resto para número
    numero_str = ""
    For i = 2 To Len(pasta)
        numero_str = numero_str & Mid(pasta, i, 1)
    Next i
    
    If IsNumeric(numero_str) Then
        ExtrairNumeroPasta = CInt(numero_str)
    Else
        ExtrairNumeroPasta = 1
    End If
End Function

' ====================================================
' FUNÇÃO PARA ATUALIZAR CONTADORES
' ====================================================
Sub AtualizarContadores()
    Dim ws_dados As Worksheet
    Dim ws_painel As Worksheet
    Dim ws_config As Worksheet
    Dim ultima_linha As Long
    Dim total_pessoas As Long
    Dim relatorio_pastas As String
    Dim i As Long
    Dim pasta_atual As String
    Dim contador_pasta As Integer
    Dim pastas_unicas As Collection
    Dim pasta As Variant
    
    On Error Resume Next
    
    Set ws_dados = Worksheets(ABA_DADOS)
    Set ws_painel = Worksheets(ABA_PAINEL)
    Set ws_config = Worksheets(ABA_CONFIG)
    Set pastas_unicas = New Collection
    
    ultima_linha = ws_dados.Cells(ws_dados.Rows.Count, "A").End(xlUp).Row
    total_pessoas = ultima_linha - 1 ' Subtrair cabeçalho
    
    ' Atualizar total no painel
    ws_painel.Range("B2").Value = "Total de Pessoas: " & total_pessoas
    
    ' Coletar pastas únicas
    For i = 2 To ultima_linha
        pasta_atual = ws_dados.Cells(i, 3).Value
        If pasta_atual <> "" Then
            pastas_unicas.Add pasta_atual, pasta_atual ' A chave evita duplicatas
        End If
    Next i
    
    ' Gerar relatório por pasta
    relatorio_pastas = "RELATÓRIO POR PASTA:" & vbCrLf & vbCrLf
    
    For Each pasta In pastas_unicas
        contador_pasta = 0
        For i = 2 To ultima_linha
            If ws_dados.Cells(i, 3).Value = pasta Then
                contador_pasta = contador_pasta + 1
            End If
        Next i
        relatorio_pastas = relatorio_pastas & pasta & ": " & contador_pasta & " pessoas" & vbCrLf
    Next pasta
    
    ' Exibir relatório no painel
    ws_painel.Range("D2:F8").ClearContents
    ws_painel.Range("D2").Value = relatorio_pastas
    
    On Error GoTo 0
End Sub

' ====================================================
' FUNÇÃO PARA INICIALIZAR SISTEMA
' ====================================================
Sub InicializarSistema()
    Dim ws_dados As Worksheet
    Dim ws_painel As Worksheet
    Dim ws_config As Worksheet
    
    On Error GoTo TratarErro
    
    ' Verificar se as abas existem
    Set ws_dados = Worksheets(ABA_DADOS)
    Set ws_painel = Worksheets(ABA_PAINEL)
    Set ws_config = Worksheets(ABA_CONFIG)
    
    ' Configurar cabeçalhos da base de dados se estiver vazia
    If ws_dados.Range("A1").Value = "" Then
        With ws_dados
            .Range("A1").Value = "ID"
            .Range("B1").Value = "Nome"
            .Range("C1").Value = "Pasta"
            .Range("D1").Value = "Data Inclusão"
            .Range("E1").Value = "Letra"
            .Range("F1").Value = "Numero Pasta"
        End With
    End If
    
    ' Atualizar contadores
    AtualizarContadores
    
    MsgBox "Sistema inicializado com sucesso!", vbInformation, "Sistema Pronto"
    
    Exit Sub

TratarErro:
    MsgBox "Erro na inicialização: " & Err.Description, vbCritical, "Erro"
End Sub

' ====================================================
' FUNÇÃO PARA LISTAR TODAS AS PESSOAS
' ====================================================
Sub ListarTodasPessoas()
    Dim ws_dados As Worksheet
    Dim ws_painel As Worksheet
    Dim ultima_linha As Long
    Dim i As Long
    Dim lista_completa As String
    
    On Error GoTo TratarErro
    
    Set ws_dados = Worksheets(ABA_DADOS)
    Set ws_painel = Worksheets(ABA_PAINEL)
    
    ultima_linha = ws_dados.Cells(ws_dados.Rows.Count, "A").End(xlUp).Row
    
    If ultima_linha < 2 Then
        MsgBox "Não há pessoas cadastradas no sistema.", vbInformation, "Lista Vazia"
        Exit Sub
    End If
    
    lista_completa = "LISTA COMPLETA DE PESSOAS:" & vbCrLf & vbCrLf
    
    For i = 2 To ultima_linha
        lista_completa = lista_completa & "ID: " & ws_dados.Cells(i, 1).Value
        lista_completa = lista_completa & " | " & ws_dados.Cells(i, 2).Value
        lista_completa = lista_completa & " | Pasta: " & ws_dados.Cells(i, 3).Value
        lista_completa = lista_completa & " | Data: " & ws_dados.Cells(i, 4).Value & vbCrLf
    Next i
    
    ' Exibir em área de resultados
    ws_painel.Range("A10:F20").ClearContents
    ws_painel.Range("A10").Value = lista_completa
    
    Exit Sub

TratarErro:
    MsgBox "Erro ao listar pessoas: " & Err.Description, vbCritical, "Erro"
End Sub

' ====================================================
' FUNÇÃO PARA LIMPAR CAMPOS
' ====================================================
Sub LimparCampos()
    Dim ws_painel As Worksheet
    
    Set ws_painel = Worksheets(ABA_PAINEL)
    
    ' Limpar campos de entrada
    ws_painel.Range("B4").ClearContents ' Campo de inserção
    ws_painel.Range("B7").ClearContents ' Campo de busca
    
    ' Limpar área de resultados
    ws_painel.Range("A10:F20").ClearContents
    
    MsgBox "Campos limpos!", vbInformation, "Limpo"
End Sub

' ====================================================
' FUNÇÃO PARA GERAR RELATÓRIO ESTATÍSTICO
' ====================================================
Sub GerarRelatorioEstatistico()
    Dim ws_dados As Worksheet
    Dim ultima_linha As Long
    Dim i As Long
    Dim letras_count As Object
    Dim letra As String
    Dim relatorio As String
    Dim total_pessoas As Long
    
    On Error GoTo TratarErro
    
    Set ws_dados = Worksheets(ABA_DADOS)
    Set letras_count = CreateObject("Scripting.Dictionary")
    
    ultima_linha = ws_dados.Cells(ws_dados.Rows.Count, "A").End(xlUp).Row
    total_pessoas = ultima_linha - 1
    
    If total_pessoas = 0 Then
        MsgBox "Não há dados para gerar relatório.", vbInformation, "Sem Dados"
        Exit Sub
    End If
    
    ' Contar por letra
    For i = 2 To ultima_linha
        letra = ws_dados.Cells(i, 5).Value
        If letras_count.Exists(letra) Then
            letras_count(letra) = letras_count(letra) + 1
        Else
            letras_count.Add letra, 1
        End If
    Next i
    
    ' Gerar relatório
    relatorio = "RELATÓRIO ESTATÍSTICO" & vbCrLf & String(30, "=") & vbCrLf & vbCrLf
    relatorio = relatorio & "Total de Pessoas: " & total_pessoas & vbCrLf & vbCrLf
    relatorio = relatorio & "Distribuição por Letra:" & vbCrLf
    
    Dim key As Variant
    For Each key In letras_count.Keys
        relatorio = relatorio & "Letra " & key & ": " & letras_count(key) & " pessoas (" & Format(letras_count(key) / total_pessoas, "0.0%") & ")" & vbCrLf
    Next key
    
    ' Exibir relatório
    Worksheets(ABA_PAINEL).Range("A10:F20").ClearContents
    Worksheets(ABA_PAINEL).Range("A10").Value = relatorio
    
    Exit Sub

TratarErro:
    MsgBox "Erro ao gerar relatório: " & Err.Description, vbCritical, "Erro"
End Sub