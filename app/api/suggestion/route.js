import Suggestion from "@models/suggestion";
import User from "@models/user";
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

    const user = await User.findById(creator);
    let suggestions;

    if (user?.isAdmin) {
      suggestions = await Suggestion.find({
        deletedAt: null,
      }).populate("creator");
    } else {
      suggestions = await Suggestion.find({
        creator: creator,
        deletedAt: null,
      })
        .limit(limit)
        .skip((page - 1) * limit)
        .populate("creator");
    }

    return new Response(JSON.stringify(suggestions), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all suggestion", { status: 500 });
  }
};
