export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Extract client IP headers from Cloudflare/Next.js request headers
    const clientIp = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (clientIp) {
      headers["CF-Connecting-IP"] = clientIp;
      headers["X-Forwarded-For"] = clientIp;
    }

    const response = await fetch("https://api.mygeqo.com/api/v1/public/beta-signup", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const responseData = await response.json().catch(() => null);

    return new Response(JSON.stringify(responseData), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Error proxying beta signup request:", error);
    return new Response(
      JSON.stringify({ detail: "Failed to connect to backend service" }),
      {
        status: 502,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
