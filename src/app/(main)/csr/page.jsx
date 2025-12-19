import { getCSRs } from "@/lib/api";
import CSRClient from "./CSRClient";
import React from "react";

export const metadata = {
  title: "CSR & Compliance",
  description: "Green Channels Ltd. is committed to the highest standards of social responsibility and ethical manufacturing. Explore our certifications and compliance standards.",
};

export default async function CSRPage() {
  const csrData = await getCSRs({ limit: 1000 });
  
  // Fallback certificates
  const fallbackCertificates = [
    { name: "Accord", image: "/csr/Accord.png" },
    { name: "Better Cotton", image: "/csr/Better cotton.png" },
    { name: "Fair Trade", image: "/csr/Fairtrade.png" },
    { name: "Gots", image: "/csr/GOTS.png" },
    { name: "HIG Index", image: "/csr/HIG.png" },
    { name: "ISO", image: "/csr/ISO.png" },
    { name: "ISO 14001-2015", image: "/csr/ISO 1401-2015.jpg" },
    { name: "Organic 100 Content Standard", image: "/csr/Organic.png" },
    { name: "Recycled 100 Claim Standard", image: "/csr/Recyle.png" },
    { name: "RCS", image: "/csr/RCS.png" },
    { name: "Sedex", image: "/csr/Sadex.png" },
    { name: "RSC", image: "/csr/RSC.jpg" },
  ];

  const certificates =
    csrData?.data?.length > 0
      ? csrData.data.map((csr) => ({
          name: `CSR Certificate ${csr.id.slice(0, 8)}`,
          image: csr.icon,
        }))
      : fallbackCertificates;

  return <CSRClient certificates={certificates} />;
}
