import { Button, ButtonGroup } from "@nextui-org/react";

export default function Home() {
	const logIn = async () => {};
	const getProtectedInfo = async () => {};
	const refreshToken = async () => {};

	return (
		<div className="grid place-content-center h-screen">
			<ButtonGroup>
				<Button onClick={logIn}>Log in</Button>
				<Button onClick={getProtectedInfo}>Protected</Button>
				<Button onClick={refreshToken}>Refresh</Button>
			</ButtonGroup>
		</div>
	);
}
