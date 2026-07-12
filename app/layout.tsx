import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import PageGlow from "@/components/PageGlow";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — AI/ML & Cloud Engineer`,
    template: `%s · ${site.name}`,
  },
  description: site.valueProposition,
  openGraph: {
    title: `${site.name} — AI/ML & Cloud Engineer`,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    images: ["/brand/social-banner.svg"],
    type: "website",
  },
};

// Light is the default; a stored toggle choice wins. Runs before paint.
const themeInit = `try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light")t="light";document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","light")}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full flex flex-col">
        <PageGlow />
        <ScrollProgress />
        <ScrollFx />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <Script id="chatbase-widget" strategy="afterInteractive">
          {`(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="r8okjfK0T_xEGU7L7X4w9";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`}
        </Script>
      </body>
    </html>
  );
}
