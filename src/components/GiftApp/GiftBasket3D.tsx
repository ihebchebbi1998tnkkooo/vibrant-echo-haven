import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import { Gift, Plus, Package } from 'lucide-react';
import { playTickSound } from '@/utils/audio';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GiftBasket3DProps {
  items: Product[];
  onItemDrop?: (item: Product) => void;
}

const GiftBasket3D = ({ items, onItemDrop }: GiftBasket3DProps) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const droppedItem = JSON.parse(e.dataTransfer.getData('product'));
    playTickSound();
    if (onItemDrop) {
      onItemDrop(droppedItem);
    }
  };

  return (
    <motion.div 
      className={`relative h-[600px] w-full rounded-2xl overflow-hidden border transition-all duration-300 ${
        isDraggingOver 
          ? 'border-[#700100] shadow-2xl bg-white/95' 
          : 'border-gray-100 shadow-xl bg-white/90'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="p-6 h-full overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {items.length > 0 ? (
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                  className="group bg-white rounded-xl shadow-sm p-4 border border-gray-50 hover:shadow-md transition-all transform hover:-translate-y-1"
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative cursor-pointer">
                          <motion.div 
                            className="aspect-square rounded-lg overflow-hidden bg-gray-50 mb-3"
                            whileHover={{ scale: 1.05 }}
                          >
                            <motion.img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain p-2"
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                          </motion.div>
                          <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-[#700100] transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-sm text-[#700100] font-semibold">{item.price} TND</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="flex flex-col items-center justify-center h-full text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  scale: isDraggingOver ? 1.1 : 1,
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 0.2,
                  },
                }}
                className="mb-4"
              >
                <Package className="w-20 h-20 text-[#700100] mx-auto" />
              </motion.div>
              <h3 className="text-xl font-medium text-[#700100] mb-2">
                Composez Votre Pack
              </h3>
              <p className="text-gray-500 max-w-sm">
                Glissez et déposez vos articles préférés ici pour créer votre pack personnalisé
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isDraggingOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#700100]/5 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
              className="bg-white/90 rounded-full p-6 shadow-2xl"
            >
              <Plus className="w-12 h-12 text-[#700100]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GiftBasket3D;