import Quagga from '@ericblade/quagga2';
import { AnimatePresence, motion } from 'framer-motion';
import { Camera, Loader2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { searchProductByBarcode } from '../../utils/openfoodfacts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onProductFound: (product: {
    name: string;
    brand?: string;
    category?: string;
    imageUrl?: string;
    emoji?: string;
    barcode: string;
  }) => void;
}

export const BarcodeScanner = ({ isOpen, onClose, onProductFound }: Props) => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const lastScannedRef = useRef<string | null>(null);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      startScanning();
    } else {
      stopScanning();
    }

    return () => {
      stopScanning();
    };
  }, [isOpen]);

  const startScanning = async () => {
    try {
      setIsScanning(true);

      if (!scannerRef.current) return;

      await Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            target: scannerRef.current,
            constraints: {
              facingMode: 'environment',
              width: { ideal: 1920 },
              height: { ideal: 1080 },
            },
          },
          decoder: {
            readers: [
              'ean_reader',
              'ean_8_reader',
              'code_128_reader',
              'code_39_reader',
              'upc_reader',
              'upc_e_reader',
            ],
            multiple: false,
          },
          locate: true,
        },
        (err) => {
          if (err) {
            console.error('Quagga init error:', err);
            if (err.name === 'NotAllowedError') {
              toast.error('Kamera-Zugriff wurde verweigert');
            } else if (err.name === 'NotFoundError') {
              toast.error('Keine Kamera gefunden');
            } else {
              toast.error('Kamera konnte nicht gestartet werden');
            }
            onClose();
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected((result) => {
        if (result.codeResult.code && !isProcessingRef.current) {
          const barcode = result.codeResult.code;
          // Prevent duplicate scans
          if (barcode !== lastScannedRef.current) {
            console.log('Barcode detected:', barcode);
            lastScannedRef.current = barcode;
            isProcessingRef.current = true;
            handleBarcodeDetected(barcode);
          }
        }
      });
    } catch (err: any) {
      console.error('Scanner Error:', err);
      toast.error('Fehler beim Starten des Scanners');
      onClose();
    }
  };

  const stopScanning = () => {
    try {
      Quagga.stop();
      Quagga.offDetected();
    } catch (err) {
      console.error('Error stopping scanner:', err);
    }
    setIsScanning(false);
    setIsLoading(false);
    lastScannedRef.current = null;
    isProcessingRef.current = false;
  };

  const handleBarcodeDetected = async (barcode: string) => {
    setIsLoading(true);
    stopScanning();

    const product = await searchProductByBarcode(barcode);

    if (product) {
      toast.success(`${product.name} gefunden!`);
      onProductFound({ ...product, barcode });
      onClose();
    } else {
      toast.error('Produkt nicht gefunden');
      setIsLoading(false);
      isProcessingRef.current = false;
      lastScannedRef.current = null;
      startScanning();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-50 bg-black'
      >
        {/* Header */}
        <div className='absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-white text-xl font-bold'>Barcode scannen</h2>
            <button
              onClick={onClose}
              className='p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors'
            >
              <X className='w-6 h-6 text-white' />
            </button>
          </div>
        </div>

        {/* Video */}
        <div
          ref={scannerRef}
          className='w-full h-full'
          style={{ position: 'relative' }}
        />

        {/* Scan Frame */}
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div className='relative w-64 h-64'>
            <div className='absolute inset-0 border-4 border-white/30 rounded-3xl' />
            <div className='absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-indigo-500 rounded-tl-3xl' />
            <div className='absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-indigo-500 rounded-tr-3xl' />
            <div className='absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-indigo-500 rounded-bl-3xl' />
            <div className='absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-indigo-500 rounded-br-3xl' />

            {isScanning && !isLoading && (
              <motion.div
                animate={{ y: [0, 240, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className='absolute w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent'
              />
            )}
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
            <div className='bg-white dark:bg-slate-800 rounded-2xl p-6 flex flex-col items-center gap-3'>
              <Loader2 className='w-8 h-8 text-indigo-600 animate-spin' />
              <p className='text-gray-700 dark:text-gray-300'>
                Produkt wird geladen...
              </p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pb-8'>
          <div className='flex items-center justify-center gap-2 text-white'>
            <Camera className='w-5 h-5' />
            <p>Halte den Barcode in den Rahmen</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
