'use client';
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white p-6 rounded-2xl shadow-xl w-[80%]"
                    >
                        <div className='flex items-center justify-between'>
                            <h2 className="text-xl font-semibold">매입 등록-{}</h2>
                            <button onClick={onClose}>X</button>
                        </div>
                        <div className='grid grid-flow-row grid-cols-3'>
                            <div className="text-gray-600 flex w-[100%] justify-between">
                                <div >세무구분</div>
                                <select>
                                    <option>hi</option>
                                    <option>hii</option>
                                    <option>hiii</option>
                                    <option>hiiii</option>
                                </select>
                            </div>
                            <div className="text-gray-600 flex w-[100%] justify-between">
                                <div >세무구분</div>
                                <select>
                                    <option>hi</option>
                                    <option>hii</option>
                                    <option>hiii</option>
                                    <option>hiiii</option>
                                </select>
                            </div>
                            <div className="text-gray-600 flex w-[100%] justify-between">
                                <div >세무구분</div>
                                <select>
                                    <option>hi</option>
                                    <option>hii</option>
                                    <option>hiii</option>
                                    <option>hiiii</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
function PurchaseModal() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>

            <div>
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <button onClick={() => setIsOpen(true)}>모달 열기</button>
                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
                </div>
                <div>프로필 보기</div>
            </div>
        </>
    )
}

export default PurchaseModal


