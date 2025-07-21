import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, BookOpen, Users, Search, Download, Upload } from 'lucide-react';

const InstrucoesSistema: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <HelpCircle className="h-4 w-4" />
          Instruções
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <BookOpen className="h-5 w-5" />
            Manual do Sistema de Arquivo Morto
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Visão Geral */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Como Funciona o Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Este sistema organiza automaticamente pessoas em pastas baseado na primeira letra do nome.
              </p>
              <ul className="text-sm space-y-1 list-disc pl-5">
                <li>Cada pasta pode conter até <strong>100 pessoas</strong></li>
                <li>Pessoas são organizadas por <strong>ordem alfabética</strong></li>
                <li>Novas pastas são criadas automaticamente quando necessário</li>
                <li>Nomenclatura segue o padrão: A1, A2, B1, B2, etc.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Adicionar Pessoas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-4 w-4" />
                Adicionar Pessoas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-medium">Como adicionar:</h4>
                <ol className="text-sm space-y-1 list-decimal pl-5">
                  <li>Digite o nome completo no campo "Adicionar Nova Pessoa"</li>
                  <li>Pressione Enter ou clique em "Adicionar"</li>
                  <li>O sistema automaticamente:</li>
                  <ul className="list-disc pl-5 mt-1">
                    <li>Identifica a primeira letra do nome</li>
                    <li>Encontra a pasta adequada (com menos de 100 pessoas)</li>
                    <li>Cria nova pasta se necessário</li>
                    <li>Adiciona a pessoa na pasta correta</li>
                  </ul>
                </ol>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm">
                  <strong>Exemplo:</strong> "Ana Silva" será adicionada à pasta A1. Se A1 já tiver 100 pessoas, 
                  será criada a pasta A2 automaticamente.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Buscar Pessoas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Search className="h-4 w-4" />
                Buscar e Gerenciar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-medium">Funcionalidades de busca:</h4>
                <ul className="text-sm space-y-1 list-disc pl-5">
                  <li>Digite qualquer parte do nome para buscar</li>
                  <li>Veja em qual pasta a pessoa está localizada</li>
                  <li>Edite o nome ou mova para outra pasta</li>
                  <li>Exclua registros quando necessário</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Ações disponíveis:</h4>
                <ul className="text-sm space-y-1 list-disc pl-5">
                  <li><strong>Editar:</strong> Modificar nome ou pasta da pessoa</li>
                  <li><strong>Excluir:</strong> Remover pessoa do arquivo</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Exportar/Importar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Download className="h-4 w-4" />
                Backup e Restauração
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Download className="h-3 w-3" />
                  Exportar Dados:
                </h4>
                <ul className="text-sm space-y-1 list-disc pl-5">
                  <li>Clique em "Exportar Dados" no painel de ações</li>
                  <li>Um arquivo JSON será baixado com todos os dados</li>
                  <li>Inclui relatório com estatísticas completas</li>
                  <li>Use como backup de segurança</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Upload className="h-3 w-3" />
                  Importar Dados:
                </h4>
                <ul className="text-sm space-y-1 list-disc pl-5">
                  <li>Clique em "Importar Dados"</li>
                  <li>Selecione um arquivo JSON exportado anteriormente</li>
                  <li>Todos os dados serão restaurados</li>
                  <li>Útil para migrar entre computadores</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monitoramento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                O painel mostra informações em tempo real:
              </p>
              <ul className="text-sm space-y-1 list-disc pl-5">
                <li><strong>Total de Pessoas:</strong> Quantidade total cadastrada</li>
                <li><strong>Total de Pastas:</strong> Número de pastas criadas</li>
                <li><strong>Distribuição:</strong> Quantas pessoas em cada pasta</li>
                <li><strong>Alerta:</strong> Pastas próximas do limite (100 pessoas) aparecem em vermelho</li>
              </ul>
            </CardContent>
          </Card>

          {/* Dicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">💡 Dicas Importantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-sm space-y-2 list-disc pl-5">
                <li><strong>Backup Regular:</strong> Exporte os dados periodicamente para não perder informações</li>
                <li><strong>Nomes Únicos:</strong> O sistema não permite nomes duplicados</li>
                <li><strong>Organização Automática:</strong> Deixe o sistema organizar - ele segue as regras de arquivo morto</li>
                <li><strong>Busca Inteligente:</strong> Você pode buscar por qualquer parte do nome</li>
                <li><strong>Dados Locais:</strong> Todas as informações ficam salvas no seu navegador</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstrucoesSistema;