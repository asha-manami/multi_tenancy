export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  return <div>Site Home Page Asha Manami{params.domain}</div>;
}
