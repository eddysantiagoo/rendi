import { DetailedCardBank } from "./CardBank";

export default async function BankPage({
  params: rawParams,
}: {
  params: { slug: string };
}) {
  const { slug } = await rawParams;

  const normalizedSlug = decodeURIComponent(
    slug.toLowerCase().replace(/-/g, " ")
  );

  return (
    <div className="relative flex flex-col items-center">
      <DetailedCardBank slug={normalizedSlug} />
    </div>
  );
}
