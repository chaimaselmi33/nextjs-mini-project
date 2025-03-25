import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    //lina 7abit nzid slice(0,8) bech ne5dhou ken 8 users as the photo shows ama hakeka twali famech Renew button 5tr el 8 users loulanin el expircy date is not passed yet
    return NextResponse.json(data.users);
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json(
      { message: "Error fetching users", err },
      { status: 500 }
    );
  }
}
