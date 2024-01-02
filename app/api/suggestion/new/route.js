import Suggestion from "@models/suggestion";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { description, userId } = await req.json();

  try {
    await connectToDB();
    const newSuggestion = new Suggestion({
      creator: userId,
      description,
      status: "Pending",
      createdAt: Date(),
    });

    await newSuggestion.save();

    return new Response(
      JSON.stringify({
        creator: userId,
        description,
        status: "Pending",
        createdAt: Date(),
      }),
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to create suggestion", { status: 500 });
  }
};
