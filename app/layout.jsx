import "./globals.css";
import Providers from "./utils/Providers";
// import Layout from "./components/Layout";
import Provider from "./components/Provider";
import "react-toastify/dist/ReactToastify.css";
import StyledComponentsRegistry from "./utils/AntWrapper";
import localFont from "next/font/local";
import AntConfigProvider from "./components/AntConfigProvider";
import ToastWrapper from "./components/ToastWrapper";
import BlobColors from "./components/BlobColors";
export const metadata = {
  manifest: "/manifest.json",
  title: {
    default: "آموزش سریع و آسان SQL",
    // template: "%s | کاستومیک",
  },
  description: "",
  alternates: {
    canonical: "./",
  },
  other: {
    ["color-scheme"]: "light dark",
  },
};
export const yekan = localFont({
  src: [
    {
      path: "../public/fonts/Yekan/Yekan-Bakh-FaNum-01-Hairline.woff",
      weight: "100",
    },
    {
      path: "../public/fonts/Yekan/Yekan-Bakh-FaNum-02-Thin.woff",
      weight: "200",
    },
    {
      path: "../public/fonts/Yekan/Yekan-Bakh-FaNum-03-Light.woff",
      weight: "300",
    },
    {
      path: "../public/fonts/Yekan/Yekan-Bakh-FaNum-04-Regular.woff",
      weight: "400",
    },
    {
      path: "../public/fonts/Yekan/Yekan-Bakh-FaNum-05-Medium.woff",
      weight: "500",
    },
    {
      path: "../public/fonts/Yekan/Yekan-Bakh-FaNum-06-Bold.woff",
      weight: "600",
    },
    {
      path: "../public/fonts/Yekan/Yekan-Bakh-FaNum-07-Heavy.woff",
      weight: "700",
    },
    {
      path: "../public/fonts/Yekan/Yekan-Bakh-FaNum-08-Fat.woff",
      weight: "800",
    },
  ],
});
export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className="dark ">
      <body
        className={` h-full  bg-gray-50 dark:bg-[#0e1319] w-screen relative font-[500] overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <StyledComponentsRegistry>
            <AntConfigProvider font={yekan.className}>
              {/* <Layout> */}
              <ToastWrapper font={yekan.className}>
                <div
                  className={`${yekan.className}  w-full flex flex-col  h-fit xl:mr-auto  `}
                >
                  {/* <BlobColors /> */}
                  <Provider>{children}</Provider>
                </div>
              </ToastWrapper>
              {/* </Layout> */}
            </AntConfigProvider>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
