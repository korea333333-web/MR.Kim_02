import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// GET: Retrieve all messages
export async function GET() {
    const { data: messages, error } = await supabase
        .from("guestbook")
        .select("id, name, message, created_at")
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Frontend expects "createdAt"
    const formattedMessages = messages ? messages.map((msg) => ({
        ...msg,
        createdAt: msg.created_at,
    })) : [];

    return NextResponse.json({
        total: formattedMessages.length,
        messages: formattedMessages,
    });
}

// POST: Create a new message
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, message, password } = body;

        if (!name || !message || !password) {
            return NextResponse.json(
                { error: "이름, 메시지, 비밀번호를 모두 입력해주세요." },
                { status: 400 }
            );
        }

        const { error } = await supabase.from("guestbook").insert([
            {
                name: name.slice(0, 50),
                message: message.slice(0, 500),
                password: password,
            },
        ]);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "방명록이 등록되었습니다!",
        });
    } catch {
        return NextResponse.json(
            { error: "잘못된 요청입니다." },
            { status: 400 }
        );
    }
}

// DELETE: Delete a message
export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { id, password } = body;

        if (!id || !password) {
            return NextResponse.json(
                { error: "ID와 비밀번호가 필요합니다." },
                { status: 400 }
            );
        }

        // 1. Verify password first
        const { data: entry, error: fetchError } = await supabase
            .from("guestbook")
            .select("password")
            .eq("id", id)
            .single();

        if (fetchError || !entry) {
            return NextResponse.json(
                { error: "삭제할 메시지를 찾을 수 없습니다." },
                { status: 404 }
            );
        }

        if (entry.password !== password) {
            return NextResponse.json(
                { error: "비밀번호가 일치하지 않습니다." },
                { status: 403 }
            );
        }

        // 2. Delete if verified
        const { error: deleteError } = await supabase
            .from("guestbook")
            .delete()
            .eq("id", id);

        if (deleteError) {
            return NextResponse.json({ error: deleteError.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "메시지가 삭제되었습니다.",
        });
    } catch {
        return NextResponse.json(
            { error: "잘못된 요청입니다." },
            { status: 400 }
        );
    }
}
