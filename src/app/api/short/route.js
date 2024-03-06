import { getDB, saveDB } from "@/app/lib/db";

export async function GET(req) {
    const url = req.nextUrl.searchParams.get('url');
    const db = getDB();

    let i = 1;
    for (; db[i]; i++);
    db[i] = url;
    saveDB(db);

    return Response.json({ message: "Url successfully shortened", newurl: `${process.env.PUBLIC_URL}${i}` }, { status: 201 });
}
