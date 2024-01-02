"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import WalletCard from "./WalletCard";
import TransitionCard from "./TransitionCard";
import Link from "next/link";

const Feed = () => {
  const [wallet, setWallet] = useState([]);
  const [transition, setTransition] = useState([]);
  const [limit, setLimit] = useState(3);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchWallet = async () => {
      if (session && session.user) {
        const response = await fetch("/api/wallet", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${session.user.id}`,
          },
        });
        const data = await response.json();
  
        data.value = parseFloat(data.value.$numberDecimal).toFixed(2);
  
        setWallet(data);
      }
    };
  
    fetchWallet();
  }, [session]);
  
  useEffect(() => {
    const fetchTransition = async () => {
      if (session && session.user) {
        const response = await fetch(`/api/transition?limit=${limit}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${session.user.id}`,
          },
        });
        const data = await response.json();
  
        setTransition(data);
      }
    };
  
    fetchTransition();
  }, [session, limit]);
  

  return (
    <session className="feed">
      <WalletCard wallet={wallet} />

      <div className="transitions">
        <div className="transitions-title">
          <h2 className="title">Transitions</h2>
          <Link href="/transition" className="transitions-all">
            See all
          </Link>
        </div>

        {transition.map((tran) => (
          <TransitionCard transition={tran} />
        ))}
      </div>
    </session>
  );
};

export default Feed;
