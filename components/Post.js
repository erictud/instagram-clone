import {
  DotsHorizontalIcon,
  HeartIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";
import { async } from "@firebase/util";

export default function Post({ img, username, caption, userImg, id }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "posts", id, "likes")), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [id]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
  }, [likes, session.user.uid]);

  async function likePost() {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  }

  async function sendComment(ev) {
    ev.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  }
  return (
    <div className="bg-white my-7 border rounded-md">
      {/*Post Header */}
      <div className="flex items-center p-5">
        <img
          className="h-12 rounded-full object-cover border p-1 mr-3"
          src={userImg}
          alt={username}
        />
        <p className="font-bold flex-1">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* POST IMAGE */}
      <img className="object-cover w-full" src={img} alt={caption} />
      {/* POST BTNS */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled onClick={likePost} className="btn text-red-500" />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* POST COMMENT */}
      <p className="p-5 truncate">
        {likes.length > 0 && <p className="font-bolf mb-1">{likes.length} likes</p>}
        <span className="font-bold mb-2">{username}</span>
        &nbsp; {caption}
      </p>
      {comments.length > 0 && (
        <div className="mx-10 max-h-26 overflow-y-scroll scrollbar-none">
          {comments.map((comment, i) => {
            return (
              <div className="flex items-center space-x-2 mb-2" key={i}>
                <img
                  className="h-7 rounded-full object-cover"
                  src={comment.data().userImage}
                  alt="user-image"
                />
                <p className="font-semibold">{comment.data().username}</p>
                <p className="flex-1 overflow-x-scroll scrollbar-none">{comment.data().comment}</p>
                <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
              </div>
            );
          })}
        </div>
      )}
      {/* POST INPUT BOX */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border-none flex-1 focus:ring-0"
            type="text"
            placeholder="Enter your comment..."
          />
          <button
            type="submit"
            onClick={sendComment}
            disabled={!comment.trim()}
            className="text-blue-500 font-bold disabled:cursor-not-allowed disabled:text-blue-200"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
