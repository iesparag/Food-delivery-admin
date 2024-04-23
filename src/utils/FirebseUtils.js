import { getAuth, onAuthStateChanged } from "@firebase/auth";

export const FetchIdToken = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        try {
          const token = await user.getIdToken(true);
          resolve(token);
        } catch (error) {
          console.error("Error fetching fresh ID token:", error);
          reject(error);
        }
      } else {
        localStorage.clear();
        window.location.reload();
        console.log("No user is logged in.");
        reject(new Error("No user is logged in."));
      }
    });
  });
};
