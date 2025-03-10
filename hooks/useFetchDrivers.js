"use client";
import React, { useEffect, useState } from "react";
import { pb, getCurrentUser } from "../lib/pocketbase"

const useDrivers = () => {
  // State to store drivers data
  const [drivers, setDrivers] = useState([]);
  // State to track loading state
  const [loading, setLoading] = useState(true);
  // State to track errors
  const [error, setError] = useState(null);
  // Variable that holds the data of logged in admin
  const loggedinUser = getCurrentUser();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true);
        const result = await pb.collection("drivers").getList(1, 100, {
          filter: `admin.id = "${loggedinUser.id}"`,
          requestKey: null
        });
        setDrivers(result.items)
      } catch (error) {
        setError("Error fetching drivers.");
        console.error(error)
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
  }, []);
  // Return the drivers data, loading state, and errors
  return { drivers, loading, error };
}

export default useDrivers