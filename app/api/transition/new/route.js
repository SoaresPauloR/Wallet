import Transition from "@models/transition";
import Wallet from "@models/wallet";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { description, userId, value, tag, type, date } = await req.json();

  try {
    await connectToDB();
    const newTransition = new Transition({
      creator: userId,
      description,
      value,
      type,
      tag,
      status: 'Active',
      deletedAt: null,
      date,
      createdAt: Date(),
    });

    const wallet = await Wallet.findOne({
      creator: userId,
    }).populate("creator");

    if (!wallet) {
      return new Response("Wallet not found", { status: 500 });
    }

    await newTransition.save();

    wallet.value =
      type === "I"
        ? parseFloat(wallet.value) + parseFloat(value)
        : parseFloat(wallet.value) - parseFloat(value);

    await wallet.save();

    return new Response(
      JSON.stringify({
        creator: userId,
        description,
        value,
        type,
        tag,
        date,
        newValue: wallet.value,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to create transition", { status: 500 });
  }
};
