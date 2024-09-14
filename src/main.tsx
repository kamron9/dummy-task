import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import Root from './routes/Root.tsx'
import store from './store/index.ts'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Provider store={store}>
			<Root />
		</Provider>
	</BrowserRouter>
)
