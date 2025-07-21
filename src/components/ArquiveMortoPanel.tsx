import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Search, Plus, Download, Edit3, Trash2, Users, FolderOpen } from 'lucide-react';
import { Pessoa, Pasta, ArquivoMortoData } from '@/types/arquivo-morto';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import ImportarDados from '@/components/ImportarDados';
import InstrucoesSistema from '@/components/InstrucoesSistema';

const ArquiveMortoPanel: React.FC = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [pastas, setPastas] = useState<Pasta[]>([]);
  const [novoNome, setNovoNome] = useState('');
  const [busca, setBusca] = useState('');
  const [resultadosBusca, setResultadosBusca] = useState<Pessoa[]>([]);
  const [editandoPessoa, setEditandoPessoa] = useState<Pessoa | null>(null);
  const [novoNomePessoa, setNovoNomePessoa] = useState('');
  const [novaPasta, setNovaPasta] = useState('');
  const { toast } = useToast();

  // Inicializar dados do localStorage
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('arquivoMortoData');
    if (dadosSalvos) {
      const dados: ArquivoMortoData = JSON.parse(dadosSalvos);
      setPessoas(dados.pessoas || []);
      setPastas(dados.pastas || []);
    }
  }, []);

  // Salvar dados no localStorage sempre que houver mudanças
  useEffect(() => {
    const dados: ArquivoMortoData = {
      pastas,
      pessoas,
      totalPessoas: pessoas.length
    };
    localStorage.setItem('arquivoMortoData', JSON.stringify(dados));
  }, [pessoas, pastas]);

  // Obter ou criar pasta para uma letra específica
  const obterOuCriarPasta = (letra: string): Pasta => {
    letra = letra.toUpperCase();
    
    // Encontrar pastas existentes para esta letra
    const pastasLetra = pastas.filter(p => p.letra === letra);
    
    // Procurar uma pasta com menos de 100 pessoas
    for (const pasta of pastasLetra) {
      const pessoasNaPasta = pessoas.filter(p => p.pasta === pasta.nome);
      if (pessoasNaPasta.length < 100) {
        return pasta;
      }
    }
    
    // Criar nova pasta se todas estão cheias ou não existe nenhuma
    const proximoNumero = pastasLetra.length + 1;
    const novaPasta: Pasta = {
      id: `${letra}${proximoNumero}`,
      nome: `${letra}${proximoNumero}`,
      letra,
      numero: proximoNumero,
      pessoas: []
    };
    
    setPastas(prev => [...prev, novaPasta]);
    return novaPasta;
  };

  // Adicionar nova pessoa
  const adicionarPessoa = () => {
    if (!novoNome.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira um nome válido.",
        variant: "destructive"
      });
      return;
    }

    // Verificar se a pessoa já existe
    if (pessoas.some(p => p.nome.toLowerCase() === novoNome.toLowerCase())) {
      toast({
        title: "Erro",
        description: "Esta pessoa já está cadastrada no arquivo.",
        variant: "destructive"
      });
      return;
    }

    const primeiraLetra = novoNome.charAt(0).toUpperCase();
    const pasta = obterOuCriarPasta(primeiraLetra);
    
    const novaPessoa: Pessoa = {
      id: Date.now().toString(),
      nome: novoNome.trim(),
      pasta: pasta.nome,
      dataInclusao: new Date()
    };

    setPessoas(prev => [...prev, novaPessoa]);
    setNovoNome('');
    
    toast({
      title: "Sucesso",
      description: `${novaPessoa.nome} foi adicionado(a) à pasta ${pasta.nome}.`,
      variant: "default"
    });
  };

  // Buscar pessoas
  useEffect(() => {
    if (busca.trim()) {
      const resultados = pessoas.filter(pessoa =>
        pessoa.nome.toLowerCase().includes(busca.toLowerCase())
      );
      setResultadosBusca(resultados);
    } else {
      setResultadosBusca([]);
    }
  }, [busca, pessoas]);

  // Editar pessoa
  const iniciarEdicao = (pessoa: Pessoa) => {
    setEditandoPessoa(pessoa);
    setNovoNomePessoa(pessoa.nome);
    setNovaPasta(pessoa.pasta);
  };

  const salvarEdicao = () => {
    if (!editandoPessoa || !novoNomePessoa.trim()) return;

    // Verificar se já existe outra pessoa com o mesmo nome
    const pessoaExistente = pessoas.find(p => 
      p.id !== editandoPessoa.id && 
      p.nome.toLowerCase() === novoNomePessoa.toLowerCase()
    );

    if (pessoaExistente) {
      toast({
        title: "Erro",
        description: "Já existe uma pessoa com este nome no arquivo.",
        variant: "destructive"
      });
      return;
    }

    setPessoas(prev => prev.map(p => 
      p.id === editandoPessoa.id 
        ? { ...p, nome: novoNomePessoa.trim(), pasta: novaPasta }
        : p
    ));

    setEditandoPessoa(null);
    setNovoNomePessoa('');
    setNovaPasta('');
    
    toast({
      title: "Sucesso",
      description: "Dados atualizados com sucesso.",
      variant: "default"
    });
  };

  // Excluir pessoa
  const excluirPessoa = (id: string) => {
    const pessoa = pessoas.find(p => p.id === id);
    if (pessoa) {
      setPessoas(prev => prev.filter(p => p.id !== id));
      toast({
        title: "Sucesso",
        description: `${pessoa.nome} foi removido(a) do arquivo.`,
        variant: "default"
      });
    }
  };

  // Exportar dados para download
  const exportarDados = () => {
    const dados: ArquivoMortoData = {
      pastas,
      pessoas,
      totalPessoas: pessoas.length
    };

    const dadosFormatados = {
      ...dados,
      relatorio: {
        totalPessoas: pessoas.length,
        totalPastas: pastas.length,
        pessoasPorPasta: pastas.map(pasta => ({
          pasta: pasta.nome,
          quantidade: pessoas.filter(p => p.pasta === pasta.nome).length
        }))
      }
    };

    const blob = new Blob([JSON.stringify(dadosFormatados, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arquivo-morto-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Sucesso",
      description: "Arquivo exportado com sucesso!",
      variant: "default"
    });
  };

  // Importar dados
  const importarDados = (dados: ArquivoMortoData) => {
    setPessoas(dados.pessoas || []);
    setPastas(dados.pastas || []);
  };

  // Calcular estatísticas
  const estatisticas = {
    totalPessoas: pessoas.length,
    totalPastas: pastas.length,
    pessoasPorPasta: pastas.map(pasta => ({
      pasta: pasta.nome,
      quantidade: pessoas.filter(p => p.pasta === pasta.nome).length
    })).sort((a, b) => b.quantidade - a.quantidade)
  };

  return (
    <div className="min-h-screen bg-gradient-secondary p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Painel de Arquivo Morto Escolar
            </h1>
            <InstrucoesSistema />
          </div>
          <p className="text-muted-foreground text-lg">
            Sistema de gerenciamento de documentos escolares
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Pessoas</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{estatisticas.totalPessoas}</div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Pastas</CardTitle>
              <FolderOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{estatisticas.totalPastas}</div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ações</CardTitle>
              <Download className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                onClick={exportarDados} 
                className="w-full bg-gradient-primary hover:opacity-90"
                size="sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Exportar Dados
              </Button>
              <div className="w-full">
                <ImportarDados onImportar={importarDados} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Adicionar Nova Pessoa */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Adicionar Nova Pessoa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Digite o nome completo..."
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && adicionarPessoa()}
                className="flex-1"
              />
              <Button 
                onClick={adicionarPessoa}
                className="bg-gradient-primary hover:opacity-90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Busca */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Buscar Pessoa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Digite para buscar..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="mb-4"
            />

            {resultadosBusca.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">
                  Resultados ({resultadosBusca.length}):
                </h4>
                {resultadosBusca.map((pessoa) => (
                  <div key={pessoa.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{pessoa.nome}</p>
                        <p className="text-sm text-muted-foreground">
                          Pasta: <Badge variant="secondary">{pessoa.pasta}</Badge>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => iniciarEdicao(pessoa)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => excluirPessoa(pessoa.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {busca && resultadosBusca.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                Nenhuma pessoa encontrada com o termo "{busca}".
              </p>
            )}
          </CardContent>
        </Card>

        {/* Distribuição por Pastas */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Distribuição por Pastas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {estatisticas.pessoasPorPasta.map((item) => (
                <div key={item.pasta} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-primary" />
                    <span className="font-medium">Pasta {item.pasta}</span>
                  </div>
                  <Badge variant={item.quantidade >= 100 ? "destructive" : "secondary"}>
                    {item.quantidade}/100
                  </Badge>
                </div>
              ))}
            </div>
            {estatisticas.pessoasPorPasta.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                Nenhuma pasta criada ainda.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Dialog de Edição */}
        <Dialog open={!!editandoPessoa} onOpenChange={() => setEditandoPessoa(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Pessoa</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={novoNomePessoa}
                  onChange={(e) => setNovoNomePessoa(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="pasta">Pasta</Label>
                <Input
                  id="pasta"
                  value={novaPasta}
                  onChange={(e) => setNovaPasta(e.target.value)}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setEditandoPessoa(null)}>
                  Cancelar
                </Button>
                <Button onClick={salvarEdicao} className="bg-gradient-primary hover:opacity-90">
                  Salvar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ArquiveMortoPanel;