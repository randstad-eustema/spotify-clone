"use client";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { useUser } from "@/providers/UserProvider";
import { useEffect, useState } from "react";

export default function LikeButton({ songId }) {
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    fetch(
      `http://localhost:3001/api/read/?user_id=${user?.id}&song_id=${songId}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("error");
        return res.json();
      })
      .then((data) => {
        if (data) {
          setIsLiked(true);
        }
      })
      .catch((err) => console.log(err));
  }, [songId, user?.id]);

  async function handleLike() {
    if (!user?.id) return;

    if (isLiked) {
      // delete
      try {
        const resp = await fetch("http://localhost:3001/api/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            song_id: songId,
          }),
        });

        if (resp.ok) {
          setIsLiked(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // create
      try {
        const resp = await fetch("http://localhost:3001/api/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            song_id: songId,
          }),
        });

        if (resp.ok) {
          setIsLiked(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <button
      onClick={handleLike}
      className="cursor-pointer hover:opacity-75 transition"
    >
      <Icon size={25} />
    </button>
  );
}
