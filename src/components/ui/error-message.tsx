import React from 'react';
import { TriangleAlert } from 'lucide-react';
import { FieldError } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';


interface ErrorMessageProps {
  error?: FieldError;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          className="text-red-500 text-xs font-medium flex items-center gap-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <TriangleAlert className='h-4 w-4' />
          {error.message}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage;
