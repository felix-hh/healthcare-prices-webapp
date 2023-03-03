import type { AppProps } from "next/app"
import { AppLayout } from "../components/AppLayout"
import "antd/dist/antd.css"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default MyApp
