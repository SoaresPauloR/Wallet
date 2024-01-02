import Wallet from "@models/wallet";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  const creator = request.headers.get("Authorization");

  try {
    await connectToDB();

    const wallet = await Wallet.findOne({ creator: creator }).populate(
      "creator"
    );
    return new Response(JSON.stringify(wallet), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all wallet", { status: 500 });
  }
};
