import Transition from "@models/transition";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page")); 
  const limit = parseInt(url.searchParams.get("limit")); // Obtenha o limite dos parâmetros da URL
  const creator = request.headers.get("Authorization");

  if (!creator) {
    return new Response("Authorization header is missing", { status: 400 });
  }

  try {
    await connectToDB();

    const transition = await Transition.find({
      creator: creator,
      deletedAt: null,
    })
      .sort({ createdAt: -1 }) // Ordene do mais novo para o mais antigo
      .limit(limit)
      .skip((page - 1) * limit) // Pule os documentos para a paginação// Limite a quantidade de documentos retornados
      .populate("creator");

    return new Response(JSON.stringify(transition), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all transition", { status: 500 });
  }
};
