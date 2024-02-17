import { PrismaService } from 'src/services/prisma.service';
import { CadastrarProdutodto } from './dto/produto/cadastrar-produto.dto';
import { AtualizarProdutodto } from './dto/produto/atualizar-produto.dto';
import { BuscarProdutoDto } from './dto/produto/buscar-produto.dto';
import { ListarProdutoDto } from './dto/produto/listar-produto.dto';
export declare class ProdutoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    cadastra(body: CadastrarProdutodto, jwt: string): Promise<{
        CODPROD: number;
        CODIGO: string;
        DESCRICAO: string;
        STATUS: boolean;
        CODCAT: number;
        DATAINC: Date;
        DATAALT: Date;
    }>;
    atualiza(body: AtualizarProdutodto, jwt: string): Promise<{
        CODPROD: number;
        CODIGO: string;
        DESCRICAO: string;
        STATUS: boolean;
        CODCAT: number;
        DATAINC: Date;
        DATAALT: Date;
    }>;
    buscar(body: BuscarProdutoDto, jwt: string): Promise<{
        CODPROD: number;
        CODIGO: string;
        DESCRICAO: string;
        STATUS: boolean;
        CODCAT: number;
        DATAINC: Date;
        DATAALT: Date;
    }>;
    listar(body: ListarProdutoDto, jwt: string): Promise<{
        CODPROD: number;
        CODIGO: string;
        DESCRICAO: string;
        STATUS: boolean;
        CODCAT: number;
        DATAINC: Date;
        DATAALT: Date;
    }[]>;
}
