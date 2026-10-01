import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// formatDate shows local time; pin it so results match on every machine.
process.env.TZ = "UTC";

export default defineConfig({
	plugins: [react()],
	test: {
		reporters: ["junit", "verbose"],
		environment: "jsdom",
		globals: true,
		outputFile: {
			junit: "./junit.xml",
		},
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
		},
	},
});
