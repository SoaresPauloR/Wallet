"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import SuggestionCard from "@components/SuggestionCard";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const { data: session } = useSession();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (session && session.user) {
        const response = await fetch(
          `/api/suggestion?limit=${limit}&page=${page}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${session.user.id}`,
            },
          }
        );
        const data = await response.json();

        data.length == 0 ? setPage(page - 1) : setSuggestions(data);
      }
    };

    fetchSuggestions();
  }, [session, limit, page]);

  return (
    <section className="w-full">
      <div className="suggestion-title">
        <h2 className="title pb-4">Suggestions</h2>
        <Link href="/" className="suggestion-all">
          Voltar
        </Link>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {suggestions.length > 0 ? (
          suggestions.map((sugg) => (
            <SuggestionCard suggestion={sugg} />
          ))
        ) : (
          <>Without suggestions</>
        )}
      </div>
    </section>
  );
};

export default Suggestions;
