'use client'
import { useEffect } from "react";

export default function SessionInput() {

  function handleChange() {
    fetch('/api/allRecords');
  }

  useEffect(() => {}, []);

  return (
    <input onChange={handleChange} />
  )
}

