import { createRoot } from "react-dom/client";
import { Routes } from "@generouted/react-router";
import "./main.css";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";

const root = document.getElementById("root")!;
createRoot(root).render(
	<React.StrictMode>
		<NextUIProvider>
			<Routes />
		</NextUIProvider>
	</React.StrictMode>
);
