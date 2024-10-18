import "./globals.css";

export const metadata = {
	title: "Cevicheria y asociados",
	description: "Cevicheria",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
