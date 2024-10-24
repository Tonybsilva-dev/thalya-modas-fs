'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Plus, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { LinksPropsSidebar } from '@/shared/types/dashboard/sidebar.type';

export const SidebarFloatingMenu = ({ links }: LinksPropsSidebar) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [focusedItem, setFocusedItem] = useState<number | null>(null); // Track which item is focused (clicked)

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleSubmenu = (index: number) => {
    setFocusedItem(focusedItem === index ? null : index); // Toggle the focused submenu
  };

  const renderLinks = (links: LinksPropsSidebar["links"], parentIndex = 0, isSubmenu = false): JSX.Element[] => {
    return links.map((link, index) => (
      <div key={`${parentIndex}-${index}`}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ delay: index * 0.1 }}
          className={`mb-2 flex items-center justify-end transition-transform ${focusedItem === index && !isSubmenu ? 'scale-110' : ''
            } ${focusedItem !== null && focusedItem !== index && !isSubmenu ? 'blur-sm' : ''
            }`} // Only blur the main items, not submenus
        >
          {/* Check if the link has children (submenu) */}
          {link.children && link.children.length > 0 ? (
            <>
              <button
                onClick={() => toggleSubmenu(index)}
                className="flex items-center justify-between w-full text-left"
              >
                <span
                  className={`mr-2 text-sm font-medium text-gray-700 bg-white px-2 py-1 rounded-md shadow-sm ${focusedItem !== null && focusedItem !== index && !isSubmenu ? 'blur-sm' : ''
                    }`} // Blur the text of main items, not submenus
                >
                  {link.text}
                </span>
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${focusedItem === index ? 'rotate-90' : ''
                    }`}
                />
              </button>
              {/* Render the submenu if it is focused */}
              <AnimatePresence>
                {focusedItem === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="ml-6"
                  >
                    {renderLinks(link.children, index, true)} {/* Pass true for submenus */}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Link href={link.href || '#'} className="flex items-center">
              <span
                className={`mr-2 text-sm font-medium text-gray-700 bg-white px-2 py-1 rounded-md shadow-sm ${focusedItem !== null && focusedItem !== index && !isSubmenu ? 'blur-sm' : ''
                  }`} // Blur the text of main items, not submenus
              >
                {link.text}
              </span>
              <Button
                variant="secondary"
                size="icon"
                className={`w-10 h-10 rounded-full shadow-lg ${focusedItem !== null && focusedItem !== index && !isSubmenu ? 'blur-sm' : ''
                  }`} // Blur the icon of main items, not submenus
              >
                <link.icon className="h-4 w-4" />
                <span className="sr-only">{link.text}</span>
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
    ));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-0 mb-2"
          >
            {renderLinks(links)}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        variant="default"
        size="icon"
        className="w-14 h-14 rounded-full shadow-lg"
        onClick={toggleMenu}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
      </Button>
    </div>
  );
};
