"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SuggestionCard = ({ suggestion }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const pathName = usePathname();

  const handleDeleteClick = async (e) => {
    const response = await fetch(`/api/suggestion/${suggestion._id}/`, {
      method: "DELETE", // ou 'GET', 'PUT', etc.
      headers: {
        Authorization: `${session.user.id}`, // se precisar de autenticação
      },
    });
    if (response.ok) {
      toast.success("Suggestion deleted successfully", {
        onClose: () => {
          router.push("/suggestion");
        },
      });
    }
  };

  return (
    <div className="suggestion-card">
      <div className="w-[70%]">
        <h3 className="card-title">{suggestion.description}</h3>
      </div>

      <div>
        {suggestion.status === "Pending" ? (
          <div className="text-yellow-600">Pending</div>
        ) : (
          <div className="text-green-800">Finished</div>
        )}
      </div>

      {pathName === "/suggestion" ? (
        <div className="card-buttons">
          <Link
            className="card-edit suggestion-card-button"
            href={`/suggestion/edit?id=${suggestion._id}`}
          >
            Edit
          </Link>
          <div
            className="card-delete suggestion-card-button"
            onClick={() => handleDeleteClick()}
          >
            Delete
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SuggestionCard;
