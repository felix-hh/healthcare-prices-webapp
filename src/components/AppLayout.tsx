import Layout from "antd/lib/layout/layout";
import Head from "next/head";
import { APPLICATION_WINDOW_TITLE } from "../utils/AppConstants";

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => (
  <Layout>
    <Head>
      <title>{APPLICATION_WINDOW_TITLE}</title>
    </Head>
    {children}
  </Layout>
);
