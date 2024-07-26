"use client";
import { useParams } from "next/navigation";

const page = () => {
  let params = useParams();
  return (
    <div>
      <h1>Your Events Id Is {params.id}</h1>
    </div>
  );
};
export default page;
