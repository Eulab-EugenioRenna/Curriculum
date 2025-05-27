import { Component, signal } from '@angular/core';
import { Ita } from './data/ita';
import { En } from './data/en';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
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

  // export() {
  //   const DATA = document.getElementById('pdf');
  //   if (DATA) {
  //     const originalWidth = DATA.offsetWidth;
  //     const originalHeight = DATA.offsetHeight;
  //     html2canvas(DATA, { scale: 2, useCORS: true }).then((canvas) => {
  //       const contentDataURL = canvas.toDataURL('image/png');
  //       // Converti le dimensioni in millimetri (1 inch = 25.4 mm, 1 px = 0.264583 mm)
  //       const mmWidth = originalWidth * 0.264583;
  //       const mmHeight = originalHeight * 0.264583;

  //       const pdf = new jsPDF({
  //         orientation: mmWidth > mmHeight ? 'landscape' : 'portrait',
  //         unit: 'mm',
  //         format: [mmWidth, mmHeight],
  //       });

  //       pdf.addImage(contentDataURL, 'PNG', 0, 0, mmWidth, mmHeight);
  //       pdf.save('MYPdf.pdf');
  //     });
  //   }
  // }

  export() {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Impostazioni di base
    let yPosition = 20;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    const lineHeight = 6;

    // Colori
    const primaryColor = [41, 128, 185]; // Blu
    const textColor = [44, 62, 80]; // Grigio scuro
    const lightGray = [236, 240, 241]; // Grigio chiaro

    // Funzione helper per verificare e convertire il testo
    const safeText = (text: any): string => {
      return text ? String(text) : '';
    };

    // Funzione per aggiungere una nuova pagina se necessario
    const checkNewPage = (requiredSpace: number = 20) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };

    // Header con nome e ruolo
    pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.rect(0, 0, pageWidth, 50, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('EUGENIO RENNA', margin, 25);

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    const roleText = safeText(this.role().toUpperCase());
    const roleLines = pdf.splitTextToSize(roleText, contentWidth);
    pdf.text(roleLines, margin, 35);

    yPosition = 60;

    // Reset colore testo
    pdf.setTextColor(textColor[0], textColor[1], textColor[2]);

    // Contatti (se disponibili)
    if (this.contatti()) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(safeText(this.contattoTitle().toUpperCase()), margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const contattiObj = this.contatti();
      if (contattiObj) {
        if (contattiObj.email) {
          const emailText = `Email: ${safeText(contattiObj.email)}`;
          const emailLines = pdf.splitTextToSize(emailText, contentWidth);
          pdf.text(emailLines, margin, yPosition);
          yPosition += emailLines.length * 5;
        }
        if (contattiObj.tel) {
          const telText = `Tel: ${safeText(contattiObj.tel)}`;
          const telLines = pdf.splitTextToSize(telText, contentWidth);
          pdf.text(telLines, margin, yPosition);
          yPosition += telLines.length * 5;
        }
      }
      yPosition += 8;
    }

    // Descrizione
    checkNewPage(30);
    pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    pdf.rect(margin - 5, yPosition - 5, contentWidth + 10, 8, 'F');

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.text(
      safeText(this.descrizioneTitle().toUpperCase()),
      margin,
      yPosition
    );
    yPosition += 10;

    pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const descrizioneText = safeText(this.descrizione());
    if (descrizioneText) {
      const descriptionLines = pdf.splitTextToSize(
        descrizioneText,
        contentWidth
      );
      pdf.text(descriptionLines, margin, yPosition);
      yPosition += descriptionLines.length * 5 + 15;
    }

    // Competenze
    checkNewPage(30);
    pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    pdf.rect(margin - 5, yPosition - 5, contentWidth + 10, 8, 'F');

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.text(safeText(this.competenzeTitle().toUpperCase()), margin, yPosition);
    yPosition += 10;

    pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const competenzeArray = this.competenze();
    if (Array.isArray(competenzeArray)) {
      const cols = 2;
      const colWidth = contentWidth / cols;
      let currentCol = 0;
      let startY = yPosition;

      competenzeArray.forEach((competenza: any, index: number) => {
        const competenzaText = safeText(competenza);
        if (competenzaText) {
          const xPos = margin + currentCol * colWidth;

          // Gestisci competenze lunghe
          const competenzaLines = pdf.splitTextToSize(
            competenzaText,
            colWidth - 10
          );
          if (competenzaLines.length > 1) {
            // Se troppo lunga per una colonna, mettila su tutta la riga
            if (currentCol > 0) {
              yPosition += 6;
              currentCol = 0;
            }
            pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            pdf.text('•', margin, yPosition);
            pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
            pdf.text(competenzaLines, margin + 5, yPosition);
            yPosition += competenzaLines.length * 5;
          } else {
            pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            pdf.text('•', xPos, yPosition);
            pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
            pdf.text(competenzaText, xPos + 5, yPosition);

            currentCol++;
            if (currentCol >= cols) {
              currentCol = 0;
              yPosition += 6;
            }
          }
        }
      });
      if (currentCol > 0) yPosition += 6;
      yPosition += 10;
    }

    // Esperienza Professionale
    checkNewPage(40);
    pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    pdf.rect(margin - 5, yPosition - 5, contentWidth + 10, 8, 'F');

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.text(safeText(this.esperienzaTitle().toUpperCase()), margin, yPosition);
    yPosition += 12;

    const esperienze = this.esperienze();
    if (Array.isArray(esperienze)) {
      esperienze.forEach((exp: any, index: number) => {
        checkNewPage(25);

        // Linea separatrice tra esperienze
        if (index > 0) {
          pdf.setDrawColor(200, 200, 200);
          pdf.line(margin, yPosition - 5, pageWidth - margin, yPosition - 5);
          yPosition += 3;
        }

        // Ruolo
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
        const roleLines = pdf.splitTextToSize(
          safeText(exp?.role),
          contentWidth
        );
        pdf.text(roleLines, margin, yPosition);
        yPosition += roleLines.length * 6 + 1;

        // Info azienda e periodo
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        const info = safeText(exp?.info);
        const periodo = `${safeText(exp?.date_start)} - ${safeText(
          exp?.date_finish
        )}`;

        if (info && periodo) {
          const infoLines = pdf.splitTextToSize(info, contentWidth * 0.7);
          pdf.text(infoLines, margin, yPosition);

          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(100, 100, 100);
          const periodoWidth = pdf.getTextWidth(periodo);
          pdf.text(periodo, pageWidth - margin - periodoWidth, yPosition);
          yPosition += Math.max(infoLines.length * 5, 5);
        }
        yPosition += 2;

        // Descrizioni dettagliate
        if (exp?.description && Array.isArray(exp.description)) {
          exp.description.forEach((descSection: any) => {
            // Titolo della sezione (es. "IT Consult", "Web Development")
            if (descSection.descr_title) {
              pdf.setFontSize(11);
              pdf.setFont('helvetica', 'bold');
              pdf.setTextColor(
                primaryColor[0],
                primaryColor[1],
                primaryColor[2]
              );
              const titleLines = pdf.splitTextToSize(
                safeText(descSection.descr_title),
                contentWidth - 10
              );
              pdf.text(titleLines, margin + 5, yPosition);
              yPosition += titleLines.length * 5 + 1;
            }

            // Lista delle attività
            if (
              descSection.descr_list &&
              Array.isArray(descSection.descr_list)
            ) {
              pdf.setFontSize(9);
              pdf.setFont('helvetica', 'normal');
              pdf.setTextColor(textColor[0], textColor[1], textColor[2]);

              descSection.descr_list.forEach((item: any) => {
                const itemText = safeText(item);
                if (itemText) {
                  checkNewPage(8);

                  // Bullet point
                  pdf.setTextColor(
                    primaryColor[0],
                    primaryColor[1],
                    primaryColor[2]
                  );
                  pdf.text('•', margin + 10, yPosition);

                  // Testo dell'elemento
                  pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
                  const itemLines = pdf.splitTextToSize(
                    itemText,
                    contentWidth - 20
                  );
                  pdf.text(itemLines, margin + 15, yPosition);
                  yPosition += itemLines.length * 4 + 2;
                }
              });
              yPosition += 3; // Spazio tra sezioni
            }
          });
        }

        yPosition += 5; // Spazio finale tra esperienze
      });
    }

    // Formazione
    checkNewPage(30);
    pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    pdf.rect(margin - 5, yPosition - 5, contentWidth + 10, 8, 'F');

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.text(safeText(this.formazioneTitle().toUpperCase()), margin, yPosition);
    yPosition += 12;

    const formazioni = this.formazioni();
    if (Array.isArray(formazioni)) {
      formazioni.forEach((form: any, index: number) => {
        checkNewPage(15);

        if (index > 0) {
          pdf.setDrawColor(200, 200, 200);
          pdf.line(margin, yPosition - 3, pageWidth - margin, yPosition - 3);
          yPosition += 3;
        }

        // Ruolo/Titolo del corso
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
        const formRoleLines = pdf.splitTextToSize(
          safeText(form?.role),
          contentWidth
        );
        pdf.text(formRoleLines, margin, yPosition);
        yPosition += formRoleLines.length * 5 + 1;

        // Info e periodo
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        const info = safeText(form?.info);
        const periodo = `${safeText(form?.date_start)} - ${safeText(
          form?.date_finish
        )}`;

        if (info && periodo) {
          const infoLines = pdf.splitTextToSize(info, contentWidth * 0.7);
          pdf.text(infoLines, margin, yPosition);

          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(100, 100, 100);
          const periodoWidth = pdf.getTextWidth(periodo);
          pdf.text(periodo, pageWidth - margin - periodoWidth, yPosition);
          yPosition += Math.max(infoLines.length * 5, 5);
        }
        yPosition += 2;

        // Descrizioni dettagliate (se presenti)
        if (form?.description && Array.isArray(form.description)) {
          form.description.forEach((descSection: any) => {
            // Titolo della sezione
            if (descSection.descr_title) {
              pdf.setFontSize(10);
              pdf.setFont('helvetica', 'bold');
              pdf.setTextColor(
                primaryColor[0],
                primaryColor[1],
                primaryColor[2]
              );
              const titleLines = pdf.splitTextToSize(
                safeText(descSection.descr_title),
                contentWidth - 10
              );
              pdf.text(titleLines, margin + 5, yPosition);
              yPosition += titleLines.length * 4 + 1;
            }

            // Lista delle attività/competenze
            if (
              descSection.descr_list &&
              Array.isArray(descSection.descr_list)
            ) {
              pdf.setFontSize(9);
              pdf.setFont('helvetica', 'normal');
              pdf.setTextColor(textColor[0], textColor[1], textColor[2]);

              descSection.descr_list.forEach((item: any) => {
                const itemText = safeText(item);
                if (itemText) {
                  checkNewPage(6);

                  // Bullet point
                  pdf.setTextColor(
                    primaryColor[0],
                    primaryColor[1],
                    primaryColor[2]
                  );
                  pdf.text('•', margin + 10, yPosition);

                  // Testo dell'elemento
                  pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
                  const itemLines = pdf.splitTextToSize(
                    itemText,
                    contentWidth - 20
                  );
                  pdf.text(itemLines, margin + 15, yPosition);
                  yPosition += itemLines.length * 4 + 1;
                }
              });
              yPosition += 2; // Spazio tra sezioni
            }
          });
        }

        yPosition += 5; // Spazio finale tra formazioni
      });
    }

    // Corsi/Certificazioni
    if (
      this.corsi() &&
      Array.isArray(this.corsi()) &&
      this.corsi().corsi.length > 0
    ) {
      checkNewPage(30);
      pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      pdf.rect(margin - 5, yPosition - 5, contentWidth + 10, 8, 'F');

      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.text(safeText(this.certificatiTitle()), margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
      this.corsi().corsi.forEach((corso: any) => {
        const corsoText = safeText(corso);
        if (corsoText) {
          checkNewPage(6);
          pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          pdf.text('•', margin, yPosition);
          pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
          const corsoLines = pdf.splitTextToSize(corsoText, contentWidth - 10);
          pdf.text(corsoLines, margin + 5, yPosition);
          yPosition += corsoLines.length * 5;
        }
      });
      yPosition += 5;
    }

    // Lingue
    checkNewPage(20);
    pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    pdf.rect(margin - 5, yPosition - 5, contentWidth + 10, 8, 'F');

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.text(safeText(this.lingueTitle().toUpperCase()), margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
    const lingue = this.lingue();
    if (Array.isArray(lingue)) {
      lingue.forEach((lingua: any) => {
        // Gestisci l'oggetto lingua con proprietà lang e cert
        if (lingua && typeof lingua === 'object') {
          const linguaText = safeText(lingua.lang);
          if (linguaText) {
            checkNewPage(8);
            pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            pdf.text('•', margin, yPosition);
            pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
            const linguaLines = pdf.splitTextToSize(
              linguaText,
              contentWidth - 10
            );
            pdf.text(linguaLines, margin + 5, yPosition);
            yPosition += linguaLines.length * 5;

            // Se esiste una certificazione, aggiungila
            if (lingua.cert) {
              const certText = safeText(lingua.cert);
              if (certText) {
                pdf.setFontSize(9);
                pdf.setTextColor(100, 100, 100);
                const certLines = pdf.splitTextToSize(
                  `Certificazione: ${certText}`,
                  contentWidth - 15
                );
                pdf.text(certLines, margin + 10, yPosition);
                yPosition += certLines.length * 4;
                pdf.setFontSize(10); // Reset font size
                pdf.setTextColor(textColor[0], textColor[1], textColor[2]); // Reset color
              }
            }
            yPosition += 1; // Piccolo spazio tra le lingue
          }
        } else {
          // Fallback per stringhe semplici (retrocompatibilità)
          const linguaText = safeText(lingua);
          if (linguaText) {
            checkNewPage(6);
            pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            pdf.text('•', margin, yPosition);
            pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
            const linguaLines = pdf.splitTextToSize(
              linguaText,
              contentWidth - 10
            );
            pdf.text(linguaLines, margin + 5, yPosition);
            yPosition += linguaLines.length * 5;
          }
        }
      });
    }

    // Footer
    const totalPages = pdf.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        `Pagina ${i} di ${totalPages}`,
        pageWidth - margin - 20,
        pageHeight - 10
      );
    }

    // Salva il PDF
    const fileName = this.english
      ? 'CV_Eugenio_Renna_EN.pdf'
      : 'CV_Eugenio_Renna_IT.pdf';
    pdf.save(fileName);
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
