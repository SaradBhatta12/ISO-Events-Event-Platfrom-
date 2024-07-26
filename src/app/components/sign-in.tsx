import { signIn } from "@/auth";
import { FaGoogle } from "react-icons/fa";
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    ></form>
  );
}
