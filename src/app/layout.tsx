"use client"

import { AuthProvider } from "./context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../../public/css/bootstrap.min.css";
import "../../public/fonts/stylesheet.css";
import "../../public/css/animation.css";
import "../../public/css/custom.css";
import "../../public/css/userStyle.css";
import "../../public/css/style.css";
import "../../public/css/slider.css";
import "../../public/css/responsive.css";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <title> Nextpet </title>
        <link rel="icon" href="./favicon.ico" type="image/x-icon"/>
        <meta name="description" content="Find your next puppy kitten or next best friend with NextPett! Download the app now!" />

        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16946850070"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16946850070');
        `}} />
        
        {/* Event Snippet */}
        <script dangerouslySetInnerHTML={{
          __html: `
          gtag('event', 'ads_conversion_Sign_up_1', {});
        `}} />
      </head>
      
      <body>
        <AuthProvider>
            <Header />
            {children}
            <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
