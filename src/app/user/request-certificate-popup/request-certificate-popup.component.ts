import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReportPopupComponent } from 'src/app/accommodation/report-popup/report-popup.component';
import { ReportUserService } from 'src/app/accommodation/services/report-user.service';
import { CSR } from 'src/app/certificate/model/CSR.model';
import { CertifcateService } from 'src/app/certificate/services/certifcate.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-request-certificate-popup',
  templateUrl: './request-certificate-popup.component.html',
  styleUrls: ['./request-certificate-popup.component.css']
})
export class RequestCertificatePopupComponent {
  selectedOption: string = 'option1';
  errorMessage: string | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ReportPopupComponent>,
    private reportService: ReportUserService,
    private certificateService: CertifcateService,
    private userService: UserService) {

  }

  file: File | undefined;

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }
  
  readFile(file: File) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const content = fileReader.result as string;
      this.publicKey = content;
      this.sendRequest();
    };
    fileReader.readAsText(file);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  publicKey: string = "";
  csr: CSR = {}

  onSubmit() :void {
    if (this.selectedOption == 'option1'){
      this.publicKey= this.certificateService.generateRSAKeys();
      this.sendRequest();
    }else{
      console.log(this.file)
      if (this.file != undefined ){
        this.readFile(this.file);
      }
    }

    this.closeDialog();
  }

  sendRequest(): void{
    this.userService.getUser().subscribe({
      next: (user) => {
        this.csr = {
          publicKey: this.publicKey,
          commonName: user.name + " " + user.lastname,
          organization: "Booking",
          country: user.address.state,
          email: user.email,
          template: "EE",
          issuerAlias: "BookingCA",
          subjectAlias: user.email,
          domainName: "booking.com",
          keyUsages: ["ENCIPHER_ONLY", "CRL_SIGN", "KEY_CERT_SIGN"]
        }
    
        this.certificateService.requestCertificate(this.csr).subscribe({
          next: () => {
              console.log("successful")
          }
        })
      }
    })
    
  }


}
