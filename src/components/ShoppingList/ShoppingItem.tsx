import { motion, PanInfo, useMotionValue, useTransform, animate } from 'framer-motion';
import { Check, Edit2, ShoppingCart, X } from 'lucide-react';
import { forwardRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useFirebaseSync } from '../../hooks/useFirebaseSync';
import { useStore } from '../../store/useStore';
import type { ShoppingItem as ShoppingItemType } from '../../types';
import { hapticFeedback } from '../../utils/haptics';

interface Props {
  item: ShoppingItemType;
}

export const ShoppingItem = forwardRef<HTMLDivElement, Props>(
  ({ item }, ref) => {
    const { user, categories } = useStore();
    const { updateItemInFirebase, deleteItemFromFirebase } = useFirebaseSync(
      user?.uid || null
    );
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(item.name);
    const [editDescription, setEditDescription] = useState(
      item.description || ''
    );
    const [isDragging, setIsDragging] = useState(false);

    const x = useMotionValue(0);
    const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
    const scale = useTransform(x, [-200, 0, 200], [0.8, 1, 0.8]);

    const category = categories.find((c) => c.id === item.category);

    const handleDragEnd = async (_event: any, info: PanInfo) => {
      const swipeThreshold = 150;

      if (info.offset.x > swipeThreshold) {
        // Swipe Right = Purchase (removes item)
        hapticFeedback.success();
        await animate(x, window.innerWidth, {
          duration: 0.3,
          ease: 'easeOut'
        });
        await deleteItemFromFirebase(item.id);
        toast.success(`${item.name} gekauft! ✓`, {
          icon: '🛒',
          duration: 2000,
        });
      } else if (info.offset.x < -swipeThreshold) {
        // Swipe Left = Also purchase (removes item)
        hapticFeedback.success();
        await animate(x, -window.innerWidth, {
          duration: 0.3,
          ease: 'easeOut'
        });
        await deleteItemFromFirebase(item.id);
        toast.success(`${item.name} gekauft! ✓`, {
          icon: '🛒',
          duration: 2000,
        });
      } else {
        // Snap back if threshold not reached
        hapticFeedback.light();
        animate(x, 0, {
          type: 'spring',
          stiffness: 400,
          damping: 30
        });
      }

      setIsDragging(false);
    };

    const handleSaveEdit = () => {
      if (editName.trim()) {
        updateItemInFirebase(item.id, {
          name: editName.trim(),
          description: editDescription.trim(),
        });
        setIsEditing(false);
        hapticFeedback.medium();
      }
    };

    const handleCancelEdit = () => {
      setEditName(item.name);
      setEditDescription(item.description || '');
      setIsEditing(false);
    };

    return (
      <motion.div
        ref={ref}
        style={{ x, opacity, scale, zIndex: isDragging ? 50 : 1 }}
        drag='x'
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: 'grabbing' }}
        className='relative touch-pan-y'
      >
        {/* Swipe Indicators - Behind content */}
        <motion.div
          className='absolute inset-0 flex items-center justify-between px-6 pointer-events-none z-0'
        >
          <motion.div
            style={{
              opacity: useTransform(x, [-150, -149, 0], [1, 0, 0]),
              scale: useTransform(x, [-150, -149, 0], [1.1, 0.9, 0.9])
            }}
          >
            <ShoppingCart className='w-8 h-8 text-green-500 drop-shadow-lg' />
          </motion.div>

          <motion.div
            style={{
              opacity: useTransform(x, [0, 149, 150], [0, 0, 1]),
              scale: useTransform(x, [0, 149, 150], [0.9, 0.9, 1.1])
            }}
          >
            <ShoppingCart className='w-8 h-8 text-green-500 drop-shadow-lg' />
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div
          className={`group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden z-10`}
        >
          {/* Category Color Bar */}
          {category && (
            <div
              className='absolute left-0 top-0 bottom-0 w-1'
              style={{ backgroundColor: category.color }}
            />
          )}

          <div className='p-4 pl-5'>
            {isEditing ? (
              <div className='space-y-2'>
                <input
                  type='text'
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className='w-full px-3 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white'
                  autoFocus
                  autoCapitalize='sentences'
                />
                <input
                  type='text'
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder='Beschreibung'
                  className='w-full px-3 py-2 bg-gray-50 dark:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm'
                  autoCapitalize='sentences'
                />
                <div className='flex gap-2 justify-end'>
                  <button
                    onClick={handleCancelEdit}
                    className='px-3 py-1.5 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-colors'
                  >
                    <X className='w-4 h-4' />
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className='px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors'
                  >
                    <Check className='w-4 h-4' />
                  </button>
                </div>
              </div>
            ) : (
              <div className='flex items-center justify-between gap-3'>
                {/* Content */}
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2.5'>
                    {/* Show emoji OR category emoji, not both */}
                    <span className='text-2xl flex-shrink-0'>
                      {item.emoji || category?.emoji || '📦'}
                    </span>
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-semibold dark:text-white truncate'>
                        {item.name}
                      </h3>
                      <div className='flex items-center gap-2 mt-0.5'>
                        {item.brand && (
                          <span className='text-xs text-gray-500 dark:text-gray-400 truncate'>
                            {item.brand}
                          </span>
                        )}
                        {category && (
                          <span
                            className='text-xs px-1.5 py-0.5 rounded-md font-medium flex-shrink-0'
                            style={{
                              backgroundColor: `${category.color}20`,
                              color: category.color,
                            }}
                          >
                            {category.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {item.description && (
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-1.5 ml-9'>
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className='flex items-center gap-1'>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsEditing(true)}
                    className='p-2 rounded-lg text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors'
                  >
                    <Edit2 className='w-4 h-4' />
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);

ShoppingItem.displayName = 'ShoppingItem';
