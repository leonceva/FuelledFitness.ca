import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Top Level Routes
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';

// Route Pages
import Home from './routes/Home';
import About from './routes/About';
import Services from './routes/Services';
import Contact from './routes/Contact';
import Athletes from './routes/Athletes';
import MyAccount from './routes/MyAccount';
import ForgotLogin from './routes/ForgotLogin';

// Used for login and authentication in '/my-account'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthProvider';
import PersistLogin from './components/PersistLogin';

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
					<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
						<AuthProvider>
							<PersistLogin>
								<MyAccount />
							</PersistLogin>
						</AuthProvider>
					</GoogleOAuthProvider>
				),
			},
			{
				path: '/forgotLogin',
				element: <ForgotLogin />,
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
