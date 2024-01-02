"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/FormSuggestion";
import { toast } from "react-toastify";

const EditSuggestion = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    id: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    const fetchSuggestion = async () => {
      const response = await fetch(`/api/suggestion/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session?.user.id}`,
        },
      });

      const { _id, description, status } = await response.json();

      setPost({
        id: _id,
        description,
        status,
      });
    };

    fetchSuggestion();
  }, []);

  const createSuggestion = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch(`/api/suggestion/${post.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          description: post.description,
          userId: session?.user.id,
          status: post.status,
        }),
      });

      if (response.ok) {
        toast.success("Suggestion updated successfully", {
          onClose: () => {
            router.push("/suggestion");
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating transaction", {
        onClose: () => {
          router.push("/suggestion/new");
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createSuggestion}
    />
  );
};

export default EditSuggestion;
