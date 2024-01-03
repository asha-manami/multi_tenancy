import { hostnamesDB } from "@/lib/db";

export async function generateStaticParams() {
  const subdomains = hostnamesDB.map((item) => item.subdomain);

  console.log("subdomains1", subdomains);

  console.log(
    "subdomains",
    subdomains.map((domain) => ({
      params: {
        domain,
      },
    }))
  );

  return subdomains.map((domain) => ({
    params: {
      domain,
    },
  }));
}

export default async function SiteLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: React.ReactNode;
}) {
  const { domain } = params;

  console.log("domain asha", domain);

  return (
    <div>
      {children}
      <>user site {domain}</>
    </div>
  );
}
