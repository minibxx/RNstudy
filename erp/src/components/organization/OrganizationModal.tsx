// 'use client';
// import React, {useState} from 'react'
// import { motion, AnimatePresence } from 'framer-motion';

// const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="bg-white p-6 rounded-2xl shadow-xl w-96"
//           >
//             <h2 className="text-xl font-semibold mb-4">모달 제목</h2>
//             <p className="text-gray-600">여기에 모달 내용을 추가하세요.</p>
//             <div className="mt-4 flex justify-end">
//               <button onClick={onClose}>닫기</button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// function OrganizationModal() {
//     const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div>
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <button onClick={() => setIsOpen(true)}>모달 열기</button>
//       <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
//     </div>
//         <div>프로필 보기</div>
//     </div>
//   )
// }

// export default OrganizationModal

