import { NextResponse } from "next/server";

// In-memory storage (Resets on server restart)
let guestbook: {
    id: number;
    name: string;
    message: string;
    password?: string; // Optional for backward compatibility, but required for new posts
    createdAt: string;
}[] = [
        {
            id: 1,
            name: "QuantumAI LAB",
            message: "방명록에 오신 것을 환영합니다! 비밀번호를 입력하면 삭제할 수 있습니다.",
            password: "admin",
            createdAt: new Date().toISOString(),
        },
    ];

// GET: Retrieve all messages
export async function GET() {
    // Return messages without passwords for security
    const safeMessages = guestbook.map(({ password, ...msg }) => msg);
    return NextResponse.json({
        total: safeMessages.length,
        messages: safeMessages.sort((a, b) => b.id - a.id),
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

        const newEntry = {
            id: Date.now(), // Simple unique ID
            name: name.slice(0, 50),
            message: message.slice(0, 500),
            password: password.slice(0, 20),
            createdAt: new Date().toISOString(),
        };

        guestbook.push(newEntry);

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

        const index = guestbook.findIndex((entry) => entry.id === id);

        if (index === -1) {
            return NextResponse.json(
                { error: "삭제할 메시지를 찾을 수 없습니다." },
                { status: 404 }
            );
        }

        if (guestbook[index].password !== password) {
            return NextResponse.json(
                { error: "비밀번호가 일치하지 않습니다." },
                { status: 403 }
            );
        }

        // Delete the entry
        guestbook.splice(index, 1);

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
