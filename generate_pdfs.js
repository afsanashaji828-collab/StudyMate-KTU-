const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const subjects = require('../data/db');

const notesDir = path.join(__dirname, '../../public');
const destDir = path.join(notesDir, 'notes');

if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
}
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}

const generatePDF = (subject) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const filePath = path.join(destDir, `${subject.code}_Notes.pdf`);
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        // Title Page
        doc.fontSize(28).fillColor('#1a365d').text(`StudyMate KTU Notes`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(22).fillColor('#2d3748').text(`${subject.code} - ${subject.name}`, { align: 'center' });
        doc.moveDown(2);
        doc.fontSize(16).fillColor('#4a5568').text(`Semester: ${subject.semester} | Credits: ${subject.credits || 'N/A'}`, { align: 'center' });
        
        // Modules
        for (let i = 1; i <= 5; i++) {
            doc.addPage();
            doc.fontSize(20).fillColor('#2b6cb0').text(`Module ${i}`, { underline: true });
            doc.moveDown();

            doc.fontSize(16).fillColor('#2d3748').text('Definition & Core Concepts');
            doc.moveDown(0.5);
            doc.fontSize(12).fillColor('#4a5568').text(`A fundamental introduction to the core principles established by KTU for ${subject.code} Operations in Module ${i}. These theoretical concepts form the basis for advanced analysis.`);
            doc.moveDown();

            doc.fontSize(16).fillColor('#2d3748').text('Detailed Explanation');
            doc.moveDown(0.5);
            doc.fontSize(12).fillColor('#4a5568').text(`In this section, we analyze the logical frameworks required to fully implement and optimize the models and mechanisms introduced above. You should be familiar with the various transformations and mathematical constraints evaluated during execution. Mastery of these concepts provides critical scaling advantages in structural derivations.`);
            doc.moveDown();

            doc.fontSize(16).fillColor('#2d3748').text('Key Algorithms & Exam Focus');
            doc.moveDown(0.5);
            doc.fontSize(12).fillColor('#4a5568').list([
                'Review typical repeated university exam questions regarding this chapter.',
                'Analyze 10-mark flowchart and architecture derivation questions.',
                'Understand boundary limits and standard operational trade-offs.',
                'Practice implementing standard models to ensure peak efficiency.'
            ]);
            doc.moveDown(2);
            doc.fontSize(10).fillColor('#a0aec0').text(`-- End of Module ${i} --`, { align: 'center' });
        }

        doc.end();

        stream.on('finish', () => resolve(filePath));
        stream.on('error', reject);
    });
};

const run = async () => {
    console.log(`Starting PDF generation for ${subjects.length} subjects...`);
    for (const sub of subjects) {
        try {
            await generatePDF(sub);
            console.log(`Generated: ${sub.code}_Notes.pdf`);
        } catch (e) {
            console.error(`Error generating ${sub.code} PDF:`, e);
        }
    }
    console.log("All PDFs generated successfully in public/notes/");
};

run();
