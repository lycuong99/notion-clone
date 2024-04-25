import Image from "next/image";

export default function Logo({ width = 128 , height = 128 }: { width?: number; height?: number }) {
  return <Image src="/logo.svg" alt="Notion logo" width={width} height={height} />;
}
