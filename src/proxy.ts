import { NextResponse, type NextRequest } from 'next/server'
import { auth } from './auth';

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const session = await auth();

    const authRoutes = ["/login", "/register"];
    const publicRoute = ["/login", "/register", "/api/auth", "/favicon.ico", "/_next"];

    if(authRoutes.includes(pathname) && session){
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (publicRoute.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    
    if(!session){
        const loginUrl = new URL("/login", req.url)
        loginUrl.searchParams.set("callbackUrl", req.url);
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
}


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js)$).*)'],
}