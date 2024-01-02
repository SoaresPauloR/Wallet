import Transition from "@models/transition";
import { connectToDB } from "@utils/database";
import Wallet from "@models/wallet";

// #region GET => Read

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const transition = await Transition.findById(params.id).populate("creator");

    if (!transition)
      return new Response("Transition not found", { status: 404 });

    return new Response(JSON.stringify(transition), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all transitions", { status: 500 });
  }
};

// #endregion

// #region PATCH => Update

export const PATCH = async (request, { params }) => {
  const { description, userId, value, tag, type, date } = await request.json();

  try {
    await connectToDB();

    const transition = await Transition.findById(params.id);

    if (!transition)
      return new Response("Transition not found", { status: 404 });

    if (transition.creator != userId) {
      return new Response(
        `User validate fail ${transition.creator} -- ${creator} `,
        { status: 401 }
      );
    }

    const wallet = await Wallet.findOne({
      creator: userId,
    }).populate("creator");

    if (!wallet) {
      return new Response("Wallet not found", { status: 500 });
    }

    wallet.value =
      type === "I"
        ? parseFloat(wallet.value) - parseFloat(transition.value) + parseFloat(value) 
        : parseFloat(wallet.value) + parseFloat(transition.value) - parseFloat(value);

    await wallet.save();

    transition.description = description;
    transition.value = value;
    transition.type = type;
    transition.tag = tag;
    transition.date = date;

    await transition.save();

    return new Response(JSON.stringify(transition), { status: 200 });
  } catch (error) {
    return new Response("Failed to update", { status: 500 });
  }
};

// #endregion

// #region DELETE => Delete

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const transition = await Transition.findById(params.id);
    const creator = request.headers.get("Authorization");

    if (!transition) {
      return new Response("Transition not found", { status: 404 });
    }

    if (transition.creator != creator) {
      return new Response(
        `User validate fail ${transition.creator} -- ${creator} `,
        { status: 401 }
      );
    }

    const wallet = await Wallet.findOne({
      creator: creator,
    }).populate("creator");

    if (!wallet) {
      return new Response("Wallet not found", { status: 500 });
    }

    wallet.value =
      transition.type === "I"
        ? parseFloat(wallet.value) - parseFloat(transition.value)
        : parseFloat(wallet.value) + parseFloat(transition.value);

    await wallet.save();

    transition.deletedAt = Date();

    await transition.save();

    return new Response("Transition deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete", { status: 500 });
  }
};

// #endregion
