import Post from "./Post";

export default function Posts() {
  const posts = [
    {
      id: 1,
      username: "ericbos",
      userImg: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg",
      img: "https://images.unsplash.com/photo-1666583149507-92a57fc81bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=900&q=60",
      caption: "Beautiful image",
    },
    {
      id: 2,
      username: "siiuuu",
      userImg: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg",
      img: "https://images.unsplash.com/photo-1666593828174-1fdd629d9225?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=900&q=60",
      caption: "Beautiful image",
    },
  ];
  return (
    <div>
      {posts.map((post, i) => (
        <Post
          key={i}
          id={post.id}
          username={post.username}
          userImg={post.userImg}
          img={post.img}
          caption={post.caption}
        />
      ))}
    </div>
  );
}
