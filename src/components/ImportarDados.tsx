import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';
import { ArquivoMortoData } from '@/types/arquivo-morto';

interface ImportarDadosProps {
  onImportar: (dados: ArquivoMortoData) => void;
}

const ImportarDados: React.FC<ImportarDadosProps> = ({ onImportar }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/json') {
      toast({
        title: "Erro",
        description: "Por favor, selecione um arquivo JSON válido.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const dados = JSON.parse(content) as ArquivoMortoData;
        
        // Validar estrutura básica dos dados
        if (!dados.pessoas || !dados.pastas) {
          throw new Error('Formato de arquivo inválido');
        }

        onImportar(dados);
        toast({
          title: "Sucesso",
          description: `Dados importados com sucesso! ${dados.pessoas.length} pessoas carregadas.`,
          variant: "default"
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Falha ao importar arquivo. Verifique se o formato está correto.",
          variant: "destructive"
        });
      }
    };

    reader.readAsText(file);
    
    // Reset input para permitir selecionar o mesmo arquivo novamente
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="file"
        accept=".json"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        id="importar-arquivo"
      />
      <Button
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
        Importar Dados
      </Button>
    </div>
  );
};

export default ImportarDados;