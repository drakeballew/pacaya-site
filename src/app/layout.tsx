import { type Metadata } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import { RootLayout } from '@/components/RootLayout'

import '@/styles/tailwind.css'

import favicon from '/favicon.ico'

export const metadata: Metadata = {
  title: {
    template: '%s - Pacaya Digital',
    default: 'Pacaya Digital - Experts in Startup Growth',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <Script id="sa-init" strategy="beforeInteractive">
          {`window.sa_event = window.sa_event || function () {
              var a = [].slice.call(arguments);
              window.sa_event.q ? window.sa_event.q.push(a) : (window.sa_event.q = [a]);
            };`}
        </Script>
        {/* Simple Analytics form submit binding */}
        <Script id="sa-form-submit" strategy="afterInteractive">
          {`(function () {
              if (window.__saFormBindInit) return; // avoid double-run in dev StrictMode
              window.__saFormBindInit = true;

              var EVENT_NAME = "form_submit";

              function bindToForm(form) {
                if (!form || form.dataset.simpleAnalytics) return;
                form.dataset.simpleAnalytics = "submit-event";

                form.addEventListener("submit", function (e) {
                  // If SA isn't loaded yet, let the form submit normally
                  if (!window.sa_loaded) return;

                  // Delay submit until after we record the event
                  e.preventDefault();

                  var button = form.querySelector('[type="submit"], .button, .btn');
                  var text = button ? (button.textContent || "").trim().toLowerCase() : null;

                  var metadata = {
                    button: text,
                    action: form.action,
                    id: form.getAttribute("id"),
                    classes: form.getAttribute("class")
                  };

                  window.sa_event(EVENT_NAME, metadata, function () {
                    form.submit();
                  });
                });
              }

              function init() {
                document.querySelectorAll("form").forEach(bindToForm);
              }

              // Run once the page is fully ready (SPA-safe)
              if (document.readyState === "complete") {
                init();
              } else {
                window.addEventListener("load", init, { once: true });
              }

              // Watch for dynamically added forms (modals, SPA nav, etc.)
              if ("MutationObserver" in window) {
                var observer = new MutationObserver(function (mutationList) {
                  mutationList.forEach(function (mutation) {
                    mutation.addedNodes.forEach(function (node) {
                      if (!node || node.nodeType !== 1) return; // Element nodes only
                      if (node.tagName === "FORM") bindToForm(node);
                      // also catch forms inside added subtrees
                      if (node.querySelectorAll) node.querySelectorAll("form").forEach(bindToForm);
                    });
                  });
                });
                observer.observe(document.body, { childList: true, subtree: true });
              } else {
                console.warn("Simple Analytics: MutationObserver not found");
              }
            })();`}
        </Script>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        
        
      </Head>
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js"  />
    </html>
  )
}
