import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import Home from './routes/Home';
import About from './routes/About';
import Services from './routes/Services';
import Contact from './routes/Contact';
import Athletes from './routes/Athletes';
import MyAccount from './routes/MyAccount';

import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/services',
				element: <Services />,
			},
			{
				path: '/contact',
				element: <Contact />,
			},
			{
				path: '/athletes',
				element: <Athletes />,
			},
			{
				path: '/my-account',
				element: (
					<GoogleOAuthProvider>
						<MyAccount />
					</GoogleOAuthProvider>
				),
			},
		],
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
