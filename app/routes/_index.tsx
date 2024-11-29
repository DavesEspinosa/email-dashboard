import { redirect } from "@remix-run/node";

export const loader = async () => {
  return redirect("/emails");
};

export default function Index() {
  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
