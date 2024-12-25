import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Package2, ShoppingBag, Gift, PenLine } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface PackSummaryProps {
  items: Product[];
  note: string;
  onNoteChange: (note: string) => void;
}

const PackSummary = ({
  items,
  note,
  onNoteChange,
}: PackSummaryProps) => {
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <motion.div 
      className="bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-lg rounded-2xl p-8 space-y-6 shadow-xl border border-gray-100"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Gift className="w-6 h-6 text-[#700100]" />
          <h2 className="text-xl font-medium text-gray-900">Résumé du Pack</h2>
        </div>
        <motion.div 
          className="flex items-center gap-2 bg-[#700100]/5 px-4 py-2 rounded-full"
          whileHover={{ scale: 1.05 }}
        >
          <ShoppingBag className="w-5 h-5 text-[#700100]" />
          <span className="font-semibold text-[#700100]">{items.length} articles</span>
        </motion.div>
      </div>
      
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="group flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-50">
                  <motion.img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-contain p-2"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <div className="flex-grow">
                  <motion.p 
                    className="font-medium text-gray-900 group-hover:text-[#700100] transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {item.name}
                  </motion.p>
                  <p className="text-sm text-[#700100] font-semibold">{item.price.toFixed(2)} TND</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <Separator className="my-6" />
      
      <div className="flex justify-between items-center text-lg font-medium p-4 rounded-xl bg-gradient-to-r from-[#700100]/5 to-[#700100]/10">
        <span className="text-gray-700">Total</span>
        <motion.span 
          key={totalPrice}
          initial={{ scale: 1.2, color: '#700100' }}
          animate={{ scale: 1, color: '#1a1a1a' }}
          className="text-xl font-semibold"
        >
          {totalPrice.toFixed(2)} TND
        </motion.span>
      </div>

      <div className="space-y-3 mt-6">
        <div className="flex items-center gap-2">
          <PenLine className="w-4 h-4 text-[#700100]" />
          <Label htmlFor="note" className="text-gray-700 font-medium">Message Personnel</Label>
        </div>
        <Textarea
          id="note"
          placeholder="Ajoutez votre message personnalisé ici..."
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          className="min-h-[100px] bg-white/80 backdrop-blur-sm border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-[#700100]/20 focus:border-[#700100] transition-all duration-300"
        />
      </div>
    </motion.div>
  );
};

export default PackSummary;