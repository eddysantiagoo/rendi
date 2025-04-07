import Image from "next/image";
import { DetailedCardBank } from "./CardBank";

export default async function BankPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const normalizedSlug = decodeURIComponent(
    slug.toLowerCase().replace(/-/g, " ")
  );

  return (
    <div className="relative flex flex-col items-center">
      <DetailedCardBank slug={normalizedSlug} />
    </div>
  );
}
