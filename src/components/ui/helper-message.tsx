import React from 'react';
import { CircleHelpIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HelperMessageProps {
  message: string;
}

const HelperMessage: React.FC<HelperMessageProps> = ({ message }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          className="text-zinc-500 text-xs font-medium flex items-center gap-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <CircleHelpIcon className='h-4 w-4' />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default HelperMessage;
