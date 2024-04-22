import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as forge from 'node-forge';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';
import { environment } from 'src/env/env';
import { CSR } from '../model/CSR.model';
import { Observable } from 'rxjs';
import { Certificate } from '../model/Certificate.model';

@Injectable({
  providedIn: 'root'
})
export class CertifcateService {

  constructor(private http: HttpClient,private authService: AuthService) { }

  generateRSAKeys(): string  {
    const { publicKey, privateKey } = forge.pki.rsa.generateKeyPair(2048);
    const privateKeyPem = forge.pki.privateKeyToPem(privateKey);

    const blob = new Blob([privateKeyPem], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'private_key.pem';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    return forge.pki.publicKeyToPem(publicKey);
  }

  requestCertificate(csr: CSR): Observable<CSR> {
    const url =  environment.apiPki + `csr`;
    return this.http.post<CSR>(url, csr, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
        skip: 'true',
			})
		});
  }

  hasCert(alias:string): Observable<Certificate>{
    const url =  environment.apiPki + `certificates/${alias}`;
    return this.http.get<Certificate>(url, {
			headers: new HttpHeaders({
        skip: 'true',
			})
		});
  }

}
