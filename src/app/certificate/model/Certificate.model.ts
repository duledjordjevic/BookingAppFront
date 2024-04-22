export interface Certificate{
    id?: number;
    serialNumber?: number;
    alias?: string;
    subject?: string;
    issuedOn?: number;
    expiresOn?: number;
    valid?: boolean;
    email?: string;
    issuer?: Certificate;
    type?: CertificateType;
}

export enum CertificateType{
    CA, EE, HTTPS, SS
} 