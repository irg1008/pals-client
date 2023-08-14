import { Button, ButtonGroup } from "@nextui-org/react";
import { useState } from "react";

export default function Home() {
	const [accessToken, setAccesstoken] = useState("");

	const logIn = async () => {
		const email = "pepe@pepe.com";
		const password = "papaspapas2@";

		const formData = new FormData();
		formData.append("email", email);
		formData.append("password", password);

		const res = await fetch("/api/auth/login", {
			method: "POST",
			body: formData,
		});

		const data = await res.json();
		console.log(data);
		setAccesstoken(data.accessToken);
	};

	const getProtected = async () => {
		const res = await fetch("/api/protected", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		const data = await res.text();
		console.log(data);
	};

	const refreshToken = async () => {
		const res = await fetch("/api/auth/refresh", {
			method: "GET",
		});

		const data = await res.json();
		console.log(data);
		setAccesstoken(data.accessToken);
	};

	return (
		<div className="grid place-content-center h-screen">
			<ButtonGroup>
				<Button onClick={logIn}>Log in</Button>
				<Button onClick={getProtected}>Protected</Button>
				<Button onClick={refreshToken}>Refresh</Button>
			</ButtonGroup>
		</div>
	);
}
