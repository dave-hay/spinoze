import {SessionProvider} from 'next-auth/react';
import type {AppProps} from 'next/app'

// styles
import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/700.css'
import '../styles/globals.css'


function MyApp({Component, pageProps}: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
        </SessionProvider>

    )
}

export default MyApp
