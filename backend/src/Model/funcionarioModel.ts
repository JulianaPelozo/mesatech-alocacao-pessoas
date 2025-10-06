export interface Funcionario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
}

let funcionarios: Funcionario[] = [];

export const getFuncionarios = (): Funcionario[] => {
    return funcionarios;
}

export const getFuncionarioById = (id: number) =>
  funcionarios.find((f) => f.id === id);

export const createFuncionario = (dados: Omit<Funcionario, "id">) => {
  const novo = { id: Date.now(), ...dados };
  funcionarios.push(novo);
  return novo;
};

export const updateFuncionario = (id: number, dados: Partial<Funcionario>) => {
  const index = funcionarios.findIndex((f) => f.id === id);
  if (index === -1) return null;
}