import { useState, useEffect } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

function Profile({}: any) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log("User:", user);
        setUser(user);
      })
      .catch((err) => setUser(null));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        { user && <h1 className="p-4 text-3xl font-bold">Hello, {user.attributes.email}!</h1> }
        <button onClick={() => Auth.signOut()}
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Sign Out</button>
    </div>
  );
}

export default withAuthenticator(Profile);
