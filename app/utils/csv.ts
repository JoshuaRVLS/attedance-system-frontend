import { Student } from "../types/student";
import Papa from "papaparse";

export function generateCSV(data: Student[], filename: string) {
  console.log("Generating CSV...");
  const csvFile = Papa.unparse(data, {
    header: true,
    newline: "\r\n",
    delimiter: ",",
  }) as BlobPart;
  const blob = new Blob([csvFile], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
