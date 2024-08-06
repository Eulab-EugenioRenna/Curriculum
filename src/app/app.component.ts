import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Ita } from './data/ita';
import { En } from './data/en';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  esperienze = signal(Ita.esperienze);
  formazioni = signal(Ita.formazioni);
  corsi = signal(Ita.corsi);

  english = false;
  italian = true;
  descrizioneTitle = signal(Ita.descrizioneTitle);
  descrizione = signal(Ita.descrizione);
  competenzeTitle = signal(Ita.competenzeTitle);
  competenze = signal(Ita.competenze);
  lingueTitle = signal(Ita.lingueTitle);
  lingue = signal(Ita.lingue);
  contattoTitle = signal(Ita.contattoTitle);
  contatti = signal(Ita.contatti);
  esperienzaTitle = signal(Ita.esperienzaTitle);
  formazioneTitle = signal(Ita.formazioneTitle);
  certificatiTitle = signal(Ita.certificatiTitle);
  role = signal(Ita.roleTitle);

  constructor() {}

  export() {
    const DATA = document.getElementById('pdf');
    if (DATA) {
      const originalWidth = DATA.offsetWidth;
      const originalHeight = DATA.offsetHeight;
      html2canvas(DATA, { scale: 2, useCORS: true }).then((canvas) => {
        const contentDataURL = canvas.toDataURL('image/png');
        // Converti le dimensioni in millimetri (1 inch = 25.4 mm, 1 px = 0.264583 mm)
        const mmWidth = originalWidth * 0.264583;
        const mmHeight = originalHeight * 0.264583;

        const pdf = new jsPDF({
          orientation: mmWidth > mmHeight ? 'landscape' : 'portrait',
          unit: 'mm',
          format: [mmWidth, mmHeight],
        });

        pdf.addImage(contentDataURL, 'PNG', 0, 0, mmWidth, mmHeight);
        pdf.save('MYPdf.pdf');
      });
    }
  }

  translate(lang: any) {
    if (lang == 'En') {
      this.english = true;
      this.italian = false;
      this.esperienze.set(En.esperienze);
      this.formazioni.set(En.formazioni);
      this.corsi.set(En.corsi);
      this.descrizioneTitle.set(En.descrizioneTitle);
      this.descrizione.set(En.descrizione);
      this.competenzeTitle.set(En.competenzeTitle);
      this.competenze.set(En.competenze);
      this.lingueTitle.set(En.lingueTitle);
      this.lingue.set(En.lingue);
      this.contattoTitle.set(En.contattoTitle);
      this.contatti.set(En.contatti);
      this.esperienzaTitle.set(En.esperienzaTitle);
      this.formazioneTitle.set(En.formazioneTitle);
      this.certificatiTitle.set(En.certificatiTitle);
      this.role.set(En.roleTitle);
    } else {
      this.english = false;
      this.italian = true;
      this.esperienze.set(Ita.esperienze);
      this.formazioni.set(Ita.formazioni);
      this.corsi.set(Ita.corsi);
      this.descrizioneTitle.set(Ita.descrizioneTitle);
      this.descrizione.set(Ita.descrizione);
      this.competenzeTitle.set(Ita.competenzeTitle);
      this.competenze.set(Ita.competenze);
      this.lingueTitle.set(Ita.lingueTitle);
      this.lingue.set(Ita.lingue);
      this.contattoTitle.set(Ita.contattoTitle);
      this.contatti.set(Ita.contatti);
      this.esperienzaTitle.set(Ita.esperienzaTitle);
      this.formazioneTitle.set(Ita.formazioneTitle);
      this.certificatiTitle.set(Ita.certificatiTitle);
      this.role.set(Ita.roleTitle);
    }
  }
}
