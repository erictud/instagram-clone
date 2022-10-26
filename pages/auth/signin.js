import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";

export default function signin({ providers }) {
  return (
    <div>
      <Header />
      <div className="flex justify-center space-x-7 mt-20">
        <img
          className="hidden object-cover rotate-6 md:inline-flex md:w-48"
          src="https://cdn1.iconfinder.com/data/icons/instagram-ui-colored/48/JD-04-512.png"
          alt="instagram"
        />
        <div className="">
          {Object.values(providers).map((provider, i) => (
            <div key={i} className="flex flex-col items-center">
              <img
                className="w-32 object-cover "
                src="https://i2.wp.com/www.techgeekandmore.com/wp-content/uploads/2017/06/Instagram-logo.png?fit=800%2C799&ssl=1"
                alt="ig"
              />
              <p className="text-sm italic my-10 text-center">
                This app is created for learning purposes!
              </p>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
