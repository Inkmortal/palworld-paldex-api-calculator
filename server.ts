import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { cors } from "@elysiajs/cors";

// Import the original API server
import "./src/index.ts";

// Import breeding API routes
import { breedingRoutes } from "./breeding-api/routes";

// Create wrapper server
const app = new Elysia()
  .use(cors())
  .use(staticPlugin({
    assets: "frontend/dist",
    prefix: "/"
  }))
  // Mount original API under /api/v1
  .group("/api/v1", (app) => 
    app.get("/", async () => {
      // Proxy to original API running on port 3000
      const response = await fetch("http://localhost:3000/");
      return response.json();
    })
  )
  // Mount breeding API routes
  .use(breedingRoutes)
  // Serve frontend for all other routes (SPA support)
  .get("*", ({ set }) => {
    set.headers["content-type"] = "text/html";
    return Bun.file("frontend/dist/index.html");
  })
  .listen(8080);

console.log(`🚀 Full application running at http://localhost:${app.server?.port}`);
console.log(`   - Original API: http://localhost:${app.server?.port}/api/v1`);
console.log(`   - Breeding API: http://localhost:${app.server?.port}/api/breeding`);
console.log(`   - Frontend: http://localhost:${app.server?.port}`);