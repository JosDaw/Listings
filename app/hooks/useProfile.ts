import { useCallback, useEffect, useState } from "react";
import { collection, doc, query, where, onSnapshot, updateDoc, getDocs } from "firebase/firestore";
import { database } from "../config/firebase";
import useUser from "../store/useUser";
import { IProfile } from "../types";

interface UseProfileResult {
  profile: IProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (updatedProfile: Partial<IProfile>) => Promise<void>;
}

const useProfile = (): UseProfileResult => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (!user || !user.userID) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Reference to the profile document in Firestore
    const profileReff = doc(collection(database, "profile"), user.userID);
    const profileRef = collection(database, "profile");
    const q = query(profileRef, where("userID", "==", user.userID));

    // Listen for real-time updates to the user profile
    const unsubscribe = onSnapshot(
      q, (snapshot) => {
        if (!snapshot.empty) {
          const profileDoc = snapshot.docs[0]; // Get the first matching document
          setProfile({ ...profileDoc.data() } as IProfile);
        } else {
          setError("User profile does not exist.");
          setProfile(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching user profile:", error);
        setError("Failed to fetch user profile.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.userID]);

  // Function to update the user profile
  const updateProfile = useCallback(async (updatedProfile: Partial<IProfile>) => {
    if (!user || !user.userID) {
      setError("No authenticated user.");
      return;
    }

    const profileRef = collection(database, "profile");
    const q = query(profileRef, where("userID", "==", user.userID));

    setLoading(true);
    setError(null);

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // Get the first matching document
        const docSnapshot = querySnapshot.docs[0];
        const oldProfile = doc(database, "profile", docSnapshot.id); // Return the document reference
        await updateDoc(oldProfile, updatedProfile);
      } 
      // Update the local state to reflect the changes immediately
      setProfile((prevProfile) => (prevProfile ? { ...prevProfile, ...updatedProfile } : null));
    } catch (err) {
      console.error("Error updating user profile:", err);
      setError("Failed to update user profile.");
    } finally {
      setLoading(false);
    }
  }, [user?.userID]);

  return { profile, loading, error, updateProfile };
};

export default useProfile;
