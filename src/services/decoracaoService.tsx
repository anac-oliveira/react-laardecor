import axios from "axios";
import type { Decoracao } from "../Types/Decoracao";

export const getDecoracao = async (): Promise<Decoracao[]> => {
    try {
        const resposta = await axios.get("http://localhost:3000/decoracao-quarto");
        return resposta.data
    } catch (error) {
        console.error ("Erro ao buscar dados: ", error);
        throw error; 
    }
}

export const deleteDecoracao = async (idDecoracao: string): Promise<void> => {
  try {
    await axios.delete(`http://localhost:3000/produto/${idDecoracao}`);
  } catch (error) {
    console.error("Erro ao deletar o produto: ", error);
    throw error;
  }
}

export const enviarFotoParaAPI = async (file: File): Promise<string | undefined> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post("http://localhost:3000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data.filename;
  } catch (error) {
    console.error("Erro no upload da imagem: ", error);
    return undefined;
  }
}

export const postDecoracao = async (decoracao: Decoracao): Promise<void> => {
  try {
    await axios.post("http://localhost:3000/produto", decoracao);
  } catch (error) {
    console.error("Erro ao cadastrar o produto", error);
    throw error;
  }
}