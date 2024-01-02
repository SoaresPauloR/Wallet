import Suggestion from "@models/suggestion";
import User from "@models/user";
import { connectToDB } from "@utils/database";

// #region GET => Read

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const suggestion = await Suggestion.findById(params.id).populate("creator");

    if (!suggestion)
      return new Response("Suggestion not found", { status: 404 });

    return new Response(JSON.stringify(suggestion), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all suggestions", { status: 500 });
  }
};

// #endregion

// #region PATCH => Update

export const PATCH = async (request, { params }) => {
  const { description, userId, status } = await request.json();

  try {
    await connectToDB();

    const user = await User.findById(userId);

    const suggestion = await Suggestion.findById(params.id);

    if (!suggestion)
      return new Response("Suggestion not found", { status: 404 });

    if (suggestion.creator != userId && !user.isAdmin) {
      return new Response(`User validate fail ${user}`, { status: 401 });
    }

    suggestion.description = description;
    suggestion.status = status;

    await suggestion.save();

    return new Response(JSON.stringify(suggestion), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update", { status: 500 });
  }
};

// #endregion

// #region DELETE => Delete

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    
    const suggestion = await Suggestion.findById(params.id);
    const userId = request.headers.get("Authorization");
    const user = await User.findById(userId);

    if (!suggestion) {
      return new Response("Suggestion not found", { status: 404 });
    }

    if (suggestion.creator != userId && !user.isAdmin) {
      return new Response(
        `User validate fail ${suggestion.creator} -- ${userId} `,
        { status: 401 }
      );
    }

    suggestion.deletedAt = Date();

    await suggestion.save();

    return new Response("Suggestion deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete", { status: 500 });
  }
};

// #endregion
