"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const PromptCard = ({ transition }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const pathName = usePathname();

  const handleDeleteClick = async (e) => {
    const response = await fetch(`/api/transition/${transition._id}/`, {
      method: "DELETE", // ou 'GET', 'PUT', etc.
      headers: {
        Authorization: `${session.user.id}`, // se precisar de autenticação
      },
    });
    if (response.ok) {
      toast.success("Transition deleted successfully", {
        onClose: () => {
          router.push("/");
        },
      });
    }
  };

  return (
    <div className="transitions-card">
      <div>
        <div>
          <div>
            <h3 className="card-title">{transition.description}</h3>
            <p
              className="card-tag"
              onClick={() => handleTagClick && handleTagClick(transition.tag)}
            >
              {transition.tag}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-2">
          <div>
            {transition.date.split("T")[0].split("-").reverse().join("/")}
          </div>
          <div>
            {transition.type === "I" ? (
              <p className="card-value income">
                {"$ "}
                {parseFloat(transition.value.$numberDecimal).toFixed(2)}
              </p>
            ) : (
              <p className="card-value expenses">
                {"$ "}
                {parseFloat(transition.value.$numberDecimal).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>

      {pathName === "/transition" ? (
        <div className="card-buttons">
          <Link
            className="card-edit"
            href={`/transition/edit?id=${transition._id}`}
          >
            Edit
          </Link>
          <div className="card-delete" onClick={() => handleDeleteClick()}>
            Delete
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PromptCard;
