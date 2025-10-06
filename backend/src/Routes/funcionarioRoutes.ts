export interface Funcionario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
}

let funcionarios = Funcionario[] = [];

export const getFuncionarios = (): Funcionario[] => {
  return funcionarios;
};