"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import { toast } from "react-toastify";

const CreateTransition = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    description: "",
    tag: "",
    value: "",
    type: "",
    date: "",
  });

  const createTransition = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch("/api/transition/new", {
        method: "POST",
        body: JSON.stringify({
          description: post.description,
          userId: session?.user.id,
          value: post.value,
          tag: post.tag,
          type: post.type,
          date: post.date,
        }),
      });

      if (response.ok) {
        toast.success("Transition created successfully", {
          onClose: () => {
            router.push("/");
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating transaction", {
        onClose: () => {
          router.push("/transition/new");
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createTransition}
      />
    </div>
  );
};

export default CreateTransition;
