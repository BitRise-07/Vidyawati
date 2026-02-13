import React from 'react'
import IconButton from './IconButton'
import { FaExclamationTriangle } from 'react-icons/fa'

const ConfirmationModal = ({ modalData }) => {
    if (!modalData) return null;
    

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-orange-100 transform animate-scale-in">
                <div className="text-center">
                    {/* Icon */}
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-orange-100 to-orange-50 rounded-full flex items-center justify-center border-8 border-white shadow-lg">
                        <FaExclamationTriangle className="text-3xl text-orange-500" />
                    </div>

                    {/* Text Content */}
                    <h3 className="text-2xl font-bold text-vd-secondary mb-3">
                        {modalData.text}
                    </h3>
                    <p className="text-vd-txt mb-8">
                        {modalData.text2}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={modalData.btn2Handler}
                            className="flex-1 px-6 py-3 border-2 border-vd-secondary text-vd-secondary font-bold rounded-xl hover:bg-vd-secondary hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {modalData.btn2Text}
                        </button>
                        <button
                            onClick={modalData.btn1Handler}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#F9872C] to-orange-500 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {modalData.btn1Text}
                        </button>
                    </div>

                  
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal