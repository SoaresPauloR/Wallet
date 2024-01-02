"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import TransitionCard from "@components/TransitionCard";

const Transitions = () => {
  const [transition, setTransition] = useState([]);
  const { data: session } = useSession();
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTransition = async () => {
      if (session && session.user) {
        const response = await fetch(
          `/api/transition?limit=${limit}&page=${page}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${session.user.id}`,
            },
          }
        );
        const data = await response.json();

        data.length == 0 ? setPage(page - 1) : setTransition(data);
      }
    };

    fetchTransition();
  }, [session, limit, page]);
  return (
    <section className="transitions">
      <div className="transitions-title">
        <h2 className="title">Transitions</h2>
        <Link href="/" className="transitions-all">
          Voltar
        </Link>
      </div>

      {transition.length > 0 ? (
        transition.map((tran) => <TransitionCard transition={tran} />)
      ) : (
        <>Sem transações</>
      )}

      {transition.length >= 3 && (
        <div className="pages">
          <button
            onClick={() => page > 1 && setPage(page - 1)}
            className="page-button"
          >
            {"<"}
          </button>
          <p className="page-button">{page}</p>
          <button onClick={() => setPage(page + 1)} className="page-button">
            {">"}
          </button>
        </div>
      )}
    </section>
  );
};

export default Transitions;
