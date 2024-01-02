"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
import { toast } from "react-toastify";

const EditTransition = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    id: "",
    description: "",
    tag: "",
    value: "",
    type: "",
  });

  useEffect(() => {
    const fetchTransition = async () => {
      const response = await fetch(`/api/transition/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session?.user.id}`,
        },
      });

      const { _id, description, tag, value, type, date } =
        await response.json();

      setPost({
        id: _id,
        description,
        tag,
        value: value.$numberDecimal,
        type,
        date: date.split("T")[0],
      });
    };

    fetchTransition();
  }, []);

  const createTransition = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch(`/api/transition/${post.id}`, {
        method: "PATCH",
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
        toast.success("Transition updated successfully", {
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
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createTransition}
    />
  );
};

export default EditTransition;
