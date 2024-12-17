import React, { useState } from 'react';
import forge from 'node-forge';

const Page = () => {
  const [certUrl, setCertUrl] = useState('');
  const [certDetails, setCertDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sanitizeUrl = (url: string) => {
    return url.replace(/^https?:\/\//, '').trim();
  };

  const parseCertificateChain = (pemChain: string) => {
    try {
      const certificates = pemChain
        .replace(
          /^[\s\S]*?-----BEGIN CERTIFICATE-----/s,
          '-----BEGIN CERTIFICATE-----',
        )
        .split('-----END CERTIFICATE-----')
        .filter((cert) => cert.trim() !== '')
        .map((cert) => cert.trim() + '\n-----END CERTIFICATE-----')
        .map((cert) =>
          cert.replace(
            /^[\s\S]*?-----BEGIN CERTIFICATE-----/s,
            '-----BEGIN CERTIFICATE-----',
          ),
        )
        .map((certPem, i) => {
          try {
            const cert = forge.pki.certificateFromPem(certPem);
            const publicKey = cert.publicKey as
              | forge.pki.rsa.PublicKey
              | undefined;
            if (!publicKey || !('n' in publicKey && 'e' in publicKey)) {
              throw new Error(`Unsupported key algorithm at index ${i}`);
            }

            return cert;
          } catch (err) {
            console.warn(
              `Skipping certificate at index ${i}:`,
              (err as Error).message,
            );
            return null;
          }
        })
        .filter((cert): cert is forge.pki.Certificate => cert !== null)
        .slice(0, 12);

      const certDetailsArray = certificates.map((cert) => {
        const now = new Date().getTime();
        const validFromDate = new Date(cert.validity.notBefore).getTime();
        const validToDate = new Date(cert.validity.notAfter).getTime();
        const validityDays = Math.floor(
          (validToDate - validFromDate) / (1000 * 60 * 60 * 24),
        );
        const daysLeft = Math.floor(
          (validToDate - now) / (1000 * 60 * 60 * 24),
        );
        const cert_valid = now >= validFromDate && now <= validToDate;

        const oidToAlgName = {
          '1.2.840.113549.1.1.5': 'sha1WithRSAEncryption',
          '1.2.840.113549.1.1.11': 'sha256WithRSAEncryption',
          '1.2.840.113549.1.1.12': 'sha384WithRSAEncryption',
          '1.2.840.113549.1.1.13': 'sha512WithRSAEncryption',
        };

        const sansExtension = cert.getExtension('subjectAltName') as any;
        const sansFormatted =
          sansExtension && Array.isArray(sansExtension.value)
            ? sansExtension.value
                .map((san: any) => san.dnsName || san.ipAddress)
                .join(', ')
            : 'No SANs available';

        return {
          issued_to: cert.subject.attributes[3]?.value || null,
          issuer_c: cert.issuer.attributes[0]?.value || null,
          issuer_o: cert.issuer.attributes[1]?.value || null,
          issuer_ou: cert.issuer.attributes[2]?.value || null,
          issuer_cn: cert.issuer.attributes[3]?.value || null,
          cert_sn: cert.serialNumber,
          cert_sha1: '',
          cert_alg:
            oidToAlgName[
              cert.siginfo.algorithmOid as keyof typeof oidToAlgName
            ] || 'Unknown Algorithm',
          cert_ver: cert.version,
          cert_sans: sansFormatted,
          cert_exp: cert.validity.notAfter,
          cert_valid,
          validFrom: cert.validity.notBefore.toISOString(),
          validTo: cert.validity.notAfter.toISOString(),
          validityDays,
          daysLeft,
        };
      });

      setCertDetails({
        certificates: certDetailsArray,
      });
      setError(null);
    } catch (err) {
      setError('Invalid certificate format.');
    }
  };

  const parseUrlCertificate = (cert: any) => {
    setCertDetails({
      certificates: [
        {
          host: cert.host,
          resolved_ip: cert.resolved_ip,
          issued_to: cert.issued_to,
          issuer_c: cert.issuer_c,
          issuer_o: cert.issuer_o,
          issuer_ou: cert.issuer_ou,
          issuer_cn: cert.issuer_cn,
          cert_sn: cert.cert_sn,
          cert_sha1: cert.cert_sha1,
          cert_alg: cert.cert_alg,
          cert_ver: cert.cert_ver,
          cert_sans: cert.cert_sans,
          cert_exp: cert.cert_exp,
          cert_valid: cert.cert_valid,
          validFrom: cert.valid_from,
          validTo: cert.valid_till,
          validityDays: cert.validity_days,
          daysLeft: cert.days_left,
          hstsHeaderEnabled: cert.hsts_header_enabled,
        }
      ],
    });
    setError(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          parseCertificateChain(reader.result);
        }
      };
      reader.readAsText(file);
    }
  };

  const fetchCertificate = async () => {
    setLoading(true);
    try {
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const response = await fetch(
        `${proxyUrl}https://ssl-checker.io/api/v1/check/${sanitizeUrl(
          certUrl,
        )}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch the certificate.');
      }
      const pem = await response.json();
      parseUrlCertificate(pem.result);
    } catch (err) {
      setError(
        'Failed to fetch or parse the certificate from the provided URL.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-[#1e2d4b] p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Certificate Viewer
        </h1>

        {/* Upload Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Upload Certificate
          </h2>
          <input
            type="file"
            accept=".crt,.pem"
            onChange={handleFileUpload}
            className="w-full p-3 bg-[#1c2537] border border-none rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#2196f3] file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:bg-[#2196f3] file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Fetch URL Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Fetch SSL Certificate from URL
          </h2>
          <input
            type="text"
            placeholder="www.example.com"
            value={certUrl}
            onChange={(e) => setCertUrl(e.target.value)}
            className="w-full p-3 bg-[#1c2537] border border-none rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#2196f3]"
          />
          <button
            onClick={fetchCertificate}
            className="w-full bg-[#2196f3] text-white p-3 rounded-lg hover:bg-[#2196f3]/80 transition-colors"
            disabled={loading}
          >
            {loading ? 'Fetching...' : 'Fetch'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {/* Certificate Details */}
        {certDetails?.certificates && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Certificate Chain Details
            </h2>
            {certDetails.certificates.map((cert: any, index: number) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg border mb-4"
              >
                <p className="mb-2">
                  <strong>Host:</strong> {cert.host}
                </p>
                <p className="mb-2">
                  <strong>Resolved IP:</strong> {cert.resolved_ip}
                </p>
                <p className="mb-2">
                  <strong>Issued To:</strong> {cert.issued_to}
                </p>
                <p className="mb-2">
                  <strong>Issuer Country:</strong> {cert.issuer_c}
                </p>
                <p className="mb-2">
                  <strong>Issuer Organization:</strong> {cert.issuer_o}
                </p>
                <p className="mb-2">
                  <strong>Issuer Common Name:</strong> {cert.issuer_cn}
                </p>
                <p className="mb-2">
                  <strong>Certificate Serial Number:</strong> {cert.cert_sn}
                </p>
                <p className="mb-2">
                  <strong>SHA1 Fingerprint:</strong> {cert.cert_sha1}
                </p>
                <p className="mb-2">
                  <strong>Certificate Algorithm:</strong> {cert.cert_alg}
                </p>
                <p className="mb-2">
                  <strong>Certificate Version:</strong> {cert.cert_ver}
                </p>
                <p className="mb-2">
                  <strong>Certificate SANs:</strong> {cert.cert_sans}
                </p>
                <p className="mb-2">
                  <strong>Valid From:</strong> {cert.validFrom}
                </p>
                <p className="mb-2">
                  <strong>Valid To:</strong> {cert.validTo}
                </p>
                <p className="mb-2">
                  <strong>Validity Days:</strong> {cert.validityDays}
                </p>
                <p className="mb-2">
                  <strong>Days Left:</strong> {cert.daysLeft}
                </p>
                <p>
                  <strong>HSTS Header Enabled:</strong>{' '}
                  {cert.hstsHeaderEnabled ? 'Yes' : 'No'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
