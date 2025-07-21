export interface Pessoa {
  id: string;
  nome: string;
  pasta: string;
  dataInclusao: Date;
}

export interface Pasta {
  id: string;
  nome: string;
  letra: string;
  numero: number;
  pessoas: Pessoa[];
}

export interface ArquivoMortoData {
  pastas: Pasta[];
  pessoas: Pessoa[];
  totalPessoas: number;
}