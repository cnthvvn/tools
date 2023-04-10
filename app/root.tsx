import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Space Tools",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  {
    rel: "stylesheet preload prefetch",
    href: tailwindStylesheetUrl,
    as: "style",
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// export const ErrorBoundary: ErrorBoundaryComponent = () => (
//   <html lang="en" className="h-screen bg-neutral-50 text-gray-900">
//     <head>
//       <title>Oups !</title>
//       <Meta />
//       <Links />
//     </head>
//     <body className="h-full">
//       <section className="flex h-full items-center sm:p-16">
//         <div className="container mx-auto my-8 flex flex-col items-center justify-center space-y-8 px-5 text-center">
//           <img
//             src="/assets/img/astronaut-500.jpg"
//             alt="petit cosmonaute avec une fusée"
//             className="h-64 rounded-full"
//           />
//           <p className="text-3xl">
//             Nos services rencontrent actuellement des difficultés techniques
//           </p>
//           <a
//             rel="noopener noreferrer"
//             href="/"
//             className="rounded bg-[#5344BB] py-2 px-4 font-bold text-white transition hover:bg-[#685BC6]"
//           >
//             Rafraîchir la page
//           </a>
//         </div>
//       </section>
//       <Scripts />
//     </body>
//   </html>
// );
