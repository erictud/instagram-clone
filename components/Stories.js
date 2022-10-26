import minifaker from "minifaker";
import "minifaker/locales/en";
import { useEffect, useState } from "react";
import Story from "./Story";
import { useSession } from "next-auth/react";
import { data } from "autoprefixer";

export default function Stories() {
  const [storyUsers, setStoryUsers] = useState([[]]);
  const { data: session } = useSession();
  useEffect(() => {
    const storyUsers = minifaker.array(20, (i) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
    }));
    setStoryUsers(storyUsers);
  }, []);
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border border-gray-200 overflow-x-scroll rounded-sm scrollbar-none">
      {session && <Story username={session.user.username} img={session.user.image} isUser="true" />}
      {storyUsers.map((user, i) => (
        <Story key={i} username={user.username} img={user.img} />
      ))}
    </div>
  );
}
