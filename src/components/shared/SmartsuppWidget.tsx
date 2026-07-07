import Script from "next/script";

export function SmartsuppWidget({ smartsuppKey }: { smartsuppKey: string | null }) {
  if (!smartsuppKey) return null;

  return (
    <Script id="smartsupp-widget" strategy="afterInteractive">
      {`
        var _smartsupp = _smartsupp || {};
        _smartsupp.key = ${JSON.stringify(smartsuppKey)};
        window.smartsupp||(function(d) {
          var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
          s=d.getElementsByTagName('script')[0];c=d.createElement('script');
          c.type='text/javascript';c.charset='utf-8';c.async=true;
          c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
        })(document);
      `}
    </Script>
  );
}