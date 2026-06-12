// src/index.ts - Cloudflare Worker Template for Container Routing

import { Container } from "@cloudflare/containers";

// Define your Container class
// This extends the Cloudflare Container class and sets the port
export class YourContainer extends Container {
  // Set to match your container's exposed port
  defaultPort = 3000;  // Common for Next.js, Express, etc.

  // Optional: Configure sleep behavior (container will sleep after inactivity)
  // sleepAfter = "5m";  // Sleep after 5 minutes of inactivity
}

// Worker fetch handler - routes requests to container
export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);

    // Optional: Redirect root to your app's base path
    if (url.pathname === "/" || url.pathname === "") {
      return Response.redirect(
        new URL("/your-base-path", request.url).toString(),
        302
      );
    }

    // Get the container instance by name
    // This creates a consistent instance for the given name
    const container = env.YOUR_CONTAINER.getByName("app-instance");

    // Forward the request directly to the container
    return await container.fetch(request);
  },
};

// Alternative: Load balancing across multiple instances
// export default {
//   async fetch(request: Request, env: any): Promise<Response> {
//     // Get container instance based on some ID (e.g., user ID, session, etc.)
//     const instanceId = new URL(request.url).searchParams.get("id") || "default";
//     const container = env.YOUR_CONTAINER.getByName(instanceId);
//
//     return await container.fetch(request);
//   },
// };
