export default function MiniProfile() {
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg"
        alt="user-image"
        className="h-16 rounded-full  border p-[2px]"
      />
      <div className="flex-1 ml-4">
        <h2 className="font-bold">EricBOSS</h2>
        <h3 className="text-gray-400 text-sm">Welcome to instagram!</h3>
      </div>
      <button className="font-semibold text-blue-400 text-sm">Sign out</button>
    </div>
  );
}
