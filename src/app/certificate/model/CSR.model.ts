export interface CSR{
    id?: number;
    publicKey?: string;
    commonName?: string;
    organization?: string;
    country?: string;
    email?: string;
    template?: string;
    issuerAlias?: string;
    subjectAlias?: string;
    domainName?: string;
    keyUsages?: string[];
}