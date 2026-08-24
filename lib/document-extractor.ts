const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;
const MAX_EXTRACTED_CHARS = 24_000;

export function validateWorkflowFiles(files: File[]) {
  if (files.length > 3) throw new Error("Choose no more than three files.");
  const total = files.reduce((sum, file) => sum + file.size, 0);
  if (total > MAX_TOTAL_BYTES) throw new Error("Files must be 20 MB or less in total.");
  for (const file of files) {
    if (file.size > MAX_FILE_BYTES) throw new Error(`${file.name} is larger than 8 MB.`);
    const extension = file.name.toLowerCase().split(".").pop();
    if (!extension || !["pdf", "docx", "txt"].includes(extension)) {
      throw new Error(`${file.name} is not a supported PDF, DOCX, or TXT file.`);
    }
  }
}

async function extractPdf(file: File) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();
  const document = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const pages: string[] = [];
  const pageLimit = Math.min(document.numPages, 40);
  for (let pageNumber = 1; pageNumber <= pageLimit; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(content.items.map((item) => "str" in item ? item.str : "").join(" "));
  }
  return pages.join("\n");
}

async function extractDocx(file: File) {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  return result.value;
}

export async function extractWorkflowFiles(files: File[]) {
  validateWorkflowFiles(files);
  const sections: string[] = [];
  for (const file of files) {
    const extension = file.name.toLowerCase().split(".").pop();
    let text = "";
    if (extension === "pdf") text = await extractPdf(file);
    else if (extension === "docx") text = await extractDocx(file);
    else text = await file.text();
    sections.push(`DOCUMENT: ${file.name}\n${text.trim()}`);
  }
  return sections.join("\n\n").slice(0, MAX_EXTRACTED_CHARS);
}
