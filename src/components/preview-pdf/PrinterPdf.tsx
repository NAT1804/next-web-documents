import { chakra, Flex } from '@chakra-ui/react';
import { BsFillPrinterFill } from 'react-icons/bs';
import { FaFileDownload } from 'react-icons/fa';

const PrinterIcon = chakra(BsFillPrinterFill);
const FileDownloadIcon = chakra(FaFileDownload);

const PrinterPdf = ({ file }) => {
  const print = () => {
    const pdfFrame = document.createElement('iframe');
    pdfFrame.style.visibility = 'hidden';
    pdfFrame.src = file;

    document.body.appendChild(pdfFrame);

    pdfFrame.contentWindow.focus();
    pdfFrame.contentWindow.print();
  };
  return (
    <>
      <Flex>
        <a href={file} download={true}>
          <FileDownloadIcon w={5} h={5} />
        </a>
        <PrinterIcon ml={3} w={5} h={5} cursor={'pointer'} onClick={print} />
      </Flex>
    </>
  );
};

export default PrinterPdf;
