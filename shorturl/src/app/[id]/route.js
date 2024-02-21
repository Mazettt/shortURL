import { getDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const db = getDB();
    const id = params.id;

    if (db[id])
        return Response.redirect(db[id], 302);
    else
        return Response.json({ message: `Url not found` }, { status: 404 });
}
