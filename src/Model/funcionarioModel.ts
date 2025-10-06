import { FuncaoModel } from "./funcaoModel";

export class FuncionarioModel {
    private id: string;
    private nomeFunc: string;
    private telefoneFunc: string;
    private emailFunc: string;
    private disponivel: boolean;
    private funcao: FuncaoModel;

    constructor(id: string, 
        nomeFunc: string, 
        telefoneFunc: string, 
        emailFunc: string, 
        disponivel: boolean
        , FuncaoModel: FuncaoModel) {

        this.id = id;
        this.nomeFunc = nomeFunc;
        this.telefoneFunc = telefoneFunc;
        this.emailFunc = emailFunc;
        this.disponivel = disponivel;
        this.funcao = FuncaoModel;
    }

    // Getters and Setters
    public getId(): string {
        return this.id;
    }

    public getNomeFunc(): string {
        return this.nomeFunc;
    }

    public getTelefoneFunc(): string {
        return this.telefoneFunc;
    }

    public getEmailFunc(): string {
        return this.emailFunc;
    }

    public getFuncao(): FuncaoModel {
        return this.funcao;
    }

    public isDisponivel(): boolean {
        return this.disponivel;
    }


    public setNomeFunc(nomeFunc: string): void {
        this.nomeFunc = nomeFunc;
    }

    public setTelefoneFunc(telefoneFunc: string): void {
        this.telefoneFunc = telefoneFunc;
    }

    public setEmailFunc(emailFunc: string): void {
        this.emailFunc = emailFunc;
    }

    public setDisponivel(disponivel: boolean): void {
        this.disponivel = disponivel;
    }


    public setFuncao(funcao: any): void {
        this.funcao = funcao;
    }



    private toString(): string {
        return `FuncionarioModel { id: ${this.id}, 
        nomeFunc: ${this.nomeFunc}, 
        telefoneFunc: ${this.telefoneFunc}, 
        emailFunc: ${this.emailFunc},
        disponivel: ${this.disponivel}, 
        Funcao: ${this.funcao.getNomeFuncao(),this.funcao.getDescricao}
    }
    }`;
    }
}                