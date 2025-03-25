import { UserList } from "@/components/UserList";

export default async function Home() {
  let users = [];

  try {
    const response = await fetch(
      `http://localhost:3000/api/users`
    );

    if (response.ok) {
      users = await response.json();
    } else {
      console.error("Error fetching users:", response.statusText);
    }
  } catch (err) {
    console.error("Error fetching users:", err);
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <UserList users={users} />
    </div>
  );
}
