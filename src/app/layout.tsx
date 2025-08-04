// "use client";

// import { ReactNode } from "react";
// import { AuthProvider } from "./context/AuthContext";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import Head from "next/head";

// import "/public/css/bootstrap.min.css";
// import "/public/fonts/stylesheet.css";
// import "/public/css/animation.css";
// import "/public/css/custom.css";
// import "/public/css/userStyle.css";
// import "/public/css/style.css";
// import "/public/css/slider.css";
// import "/public/css/responsive.css";

// interface RootLayoutProps {
//   children: ReactNode;
// }

// export default function RootLayout({ children }: RootLayoutProps) {
//   return (
//     <html lang="en">
//       <Head>
//         <title>Nextpet</title>
//         <link rel="icon" href="/favicon.ico" type="image/x-icon" />
//         <meta
//           name="description"
//           content="Find your next puppy kitten or next best friend with NextPett! Download the app now!"
//         />

//         <script
//           async
//           src="https://www.googletagmanager.com/gtag/js?id=AW-16946850070"
//         ></script>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               window.dataLayer = window.dataLayer || [];
//               function gtag(){dataLayer.push(arguments);}
//               gtag('js', new Date());
//               gtag('config', 'AW-16946850070');
//             `,
//           }}
//         />

//         <script
//           dangerouslySetInnerHTML={{
//             __html: `gtag('event', 'ads_conversion_Sign_up_1', {});`,
//           }}
//         />

//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//               new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//               j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//               'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
//               })(window,document,'script','dataLayer','GTM-NX9V4B2N');
//             `,
//           }}
//         />
//       </Head>

//       <body>
//         <noscript>
//           <iframe
//             src="https://www.googletagmanager.com/ns.html?id=GTM-NX9V4B2N"
//             height="0"
//             width="0"
//             style={{ display: "none", visibility: "hidden" }}
//           ></iframe>
//         </noscript>

//         <AuthProvider>
//           <Header />
//           {children}
//           <Footer />
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }



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
