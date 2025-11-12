import axios from "axios";
import type { Decoracao } from "../type/decoracao";

export const getDecoracao = async (): Promise<Decoracao[]> => {
    try {
        const resposta = await axios.get("http://localhost:3000/decoracao-quarto");
        return resposta.data
    } catch (error) {
        console.error ("Erro ao buscar dados: ", error);
        throw error; 
    }
}