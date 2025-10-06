export class FuncaoModel {
    private id: string;
    private nomeFuncao: string;
    private descricao?: string;

    constructor(id: string, nomeFuncao: string, descricao?: string) {
        this.id = id;
        this.nomeFuncao = nomeFuncao;
        if (descricao) {
            this.descricao = descricao;
        }
    }


    public getNomeFuncao(): string {
        return this.nomeFuncao;
    }

    public getDescricao(): string | undefined {
        return this.descricao;
    }

    public setNomeFuncao(nomeFuncao: string): void {
        this.nomeFuncao = nomeFuncao;
    }

    public setDescricao(descricao: string): void {
        this.descricao = descricao;
    }

    public toString(): string {
        return `FuncaoModel { id: ${this.id}, 
        nomeFuncao: ${this.nomeFuncao}, 
        descricao: ${this.descricao} }`;
    }
}