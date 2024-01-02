"use client";

import { useState, useEffect } from "react";

import Profile from "@components/Profile";
import { useRouter, useSearchParams } from "next/navigation";

const OtherProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <Profile
      name={userName}
      desc="Welcome to your personalized profile page."
      data={posts}
    />
  );
};

export default OtherProfile;
