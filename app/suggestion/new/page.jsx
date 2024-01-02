"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/FormSuggestion";
import { toast } from "react-toastify";

const CreateSuggestion = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    description: "",
    status: "Pending",
  });

  const CreateSuggestion = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch("/api/suggestion/new", {
        method: "POST",
        body: JSON.stringify({
          description: post.description,
          userId: session?.user.id,
        }),
      });

      if (response.ok) {
        toast.success("Suggestion created successfully", {
          onClose: () => {
            router.push("/suggestion");
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating suggestion", {
        onClose: () => {
          router.push("/suggestion/new");
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Update"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={CreateSuggestion}
      />
    </div>
  );
};

export default CreateSuggestion;
