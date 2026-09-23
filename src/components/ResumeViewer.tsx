import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Loader2, ArrowUpRight, ArrowDown } from 'lucide-react';
import { resumeConfig } from '../data/portfolioData';

// Configure PDF.js worker
if (typeof window !== 'undefined' && 'Worker' in window) {
  try {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url
    ).toString();
  } catch {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }
}

interface ResumeViewerProps {
  filePath: string;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({ filePath }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState<number>(760);

  // Measure container safely to calculate responsive PDF page width
  useEffect(() => {
    if (!containerRef.current) return;

    const calculateWidth = () => {
      if (!containerRef.current) return;
      const containerW = containerRef.current.clientWidth;

      // Desktop: 70–80% of available width with sensible max width (780px)
      // Mobile: 100% of safe content area
      if (containerW >= 1024) {
        setPageWidth(Math.min(containerW * 0.78, 780));
      } else if (containerW >= 640) {
        setPageWidth(Math.min(containerW * 0.88, 700));
      } else {
        setPageWidth(containerW);
      }
    };

    calculateWidth();

    const resizeObserver = new ResizeObserver(calculateWidth);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  function onDocumentLoadError() {
    setLoading(false);
    setError(true);
  }

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      {/* Top Document Metadata Bar */}
      <div className="w-full flex items-center justify-between pb-4 mb-6 border-b border-[#201F19] font-mono text-[10px] sm:text-[11px] text-[#68645C] uppercase tracking-[0.10em]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
          <span>CURRENT RESUME · PDF</span>
        </div>
        <div>
          {numPages ? (
            <span>
              PAGE 1 OF {numPages}
            </span>
          ) : (
            <span>PDF DOCUMENT</span>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="w-full py-24 flex flex-col items-center justify-center min-h-[500px]">
          <Loader2 className="w-7 h-7 text-[#D49A46] animate-spin mb-4" />
          <span className="font-mono text-xs text-[#8E887D] uppercase tracking-widest">
            LOADING RESUME DOCUMENT...
          </span>
        </div>
      )}

      {/* Error / Fallback State */}
      {error ? (
        <div className="w-full py-16 px-6 sm:px-12 rounded-xs bg-[#11100C] border border-[#24221C] text-center flex flex-col items-center justify-center my-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D49A46] font-semibold mb-2">
            RESUME PDF
          </span>
          <p className="font-body text-base text-[#AAA398] mb-8 max-w-md leading-relaxed">
            The resume could not be previewed here. You can open or download the original PDF directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={resumeConfig.filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D49A46] hover:bg-[#E5BA70] text-[#090907] font-mono text-xs uppercase font-bold tracking-[0.10em] rounded-xs transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <span>OPEN FULL RESUME</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
            <a
              href={resumeConfig.filePath}
              download={resumeConfig.fileName}
              className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#2E2B22] hover:border-[#D49A46]/60 bg-[#161510] text-[#F2EBDD] font-mono text-xs uppercase font-bold tracking-[0.10em] rounded-xs transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <span>DOWNLOAD RESUME</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#D49A46] transition-transform duration-300 group-hover/btn:translate-y-0.5" />
            </a>
          </div>
        </div>
      ) : (
        /* Actual PDF Rendering */
        <div className="w-full flex flex-col items-center">
          <Document
            file={filePath}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={null}
            className="flex flex-col items-center gap-6 sm:gap-8 w-full"
          >
            {Array.from(new Array(numPages || 0), (_, index) => (
              <div
                key={`page_${index + 1}`}
                className="shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border border-[#24221C] rounded-xs overflow-hidden bg-white select-none transition-shadow duration-300"
                style={{ width: pageWidth }}
              >
                <Page
                  pageNumber={index + 1}
                  renderAnnotationLayer={false}
                  renderTextLayer={true}
                  className="react-pdf__Page flex justify-center"
                  loading={
                    <div
                      className="bg-[#14130F] w-full aspect-[1/1.33] animate-pulse flex items-center justify-center"
                    >
                      <Loader2 className="w-6 h-6 text-[#D49A46] animate-spin" />
                    </div>
                  }
                  width={pageWidth}
                />
              </div>
            ))}
          </Document>
        </div>
      )}
    </div>
  );
};
